import axios from 'axios';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Pagination,
    Card,
} from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { UserInfo } from '../App';
import Restricted_view_component from './Restricted_view_component';
import { PieChart } from '@mui/x-charts';

interface SalesData {
    saleID: string;
    storeID: string;
    price: string;
    product: string;
    quantity: number;
    saleDate: string;
    total: number;
}

export default function Sales_Report_Page({
    userInfo,
}: {
    userInfo: UserInfo;
}) {
    const [items, setItems] = useState<SalesData[]>([]);
    const [firstTimeLoaded, setFirstTimeLoaded] = useState(false);
    const [sortKey, setSortKey] = useState<keyof SalesData>('saleID'); // Aquí especificamos el tipo de sortKey
    const [sortDirection, setSortDirection] = useState('asc');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const rowsPerPage = 10;
    const pages = Math.ceil(items.length / rowsPerPage);
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    // Función para ordenar los datos
    const sortedData = useMemo(() => {
        const sorted = [...items].sort((a, b) => {
            const first = a[sortKey];
            const second = b[sortKey];

            if (sortDirection === 'asc') {
                return first > second ? 1 : -1;
            } else {
                return first < second ? 1 : -1;
            }
        });
        return sorted.slice(start, end);
    }, [items, start, end, sortKey, sortDirection]);

    // Función para cambiar la dirección de ordenamiento
    const toggleSortDirection = (key: keyof SalesData) => {
        if (key === sortKey) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const getItems = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/sales`,
            );

            const array: SalesData[] = response.data.body;

            if (userInfo.role === 'admin') {
                setTotal(calculateTotal(array));
                setItems(array);
                return;
            }

            setTotal(
                calculateTotal(
                    array.filter((obj) => obj.storeID === userInfo.storeID),
                ),
            );

            setItems(array.filter((obj) => obj.storeID === userInfo.storeID));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data);
            }
        }
    };

    const calculateTotal = (items: SalesData[]) => {
        return items.reduce((acc, item) => acc + item.total, 0);
    };

    if (!firstTimeLoaded) {
        getItems();
        setFirstTimeLoaded(true);
    }

    const pieData = sortedData.map((item) => {
        return {
            label: item.product,
            value: item.quantity,
        };
    });

    return (
        <>
            {userInfo.isLoggedIn ? (
                <>
                    <div className="flex justify-center items-center mx-4 mt-11">
                        <Table
                            aria-label="Example static collection table"
                            bottomContent={
                                <>
                                    <div className="flex w-full justify-center">
                                        <Pagination
                                            isCompact
                                            showControls
                                            showShadow
                                            color="primary"
                                            page={page}
                                            total={pages}
                                            onChange={(page: number) =>
                                                setPage(page)
                                            }
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <div className="text-3xl">
                                            Sales Total: ${total}
                                        </div>
                                    </div>
                                </>
                            }
                        >
                            <TableHeader>
                                <TableColumn align="center" key={'saleID'}>
                                    Sale ID
                                </TableColumn>
                                <TableColumn
                                    align="center"
                                    allowsSorting
                                    key={'product'}
                                    onClick={() =>
                                        toggleSortDirection('product')
                                    }
                                >
                                    Product
                                </TableColumn>
                                <TableColumn
                                    align="center"
                                    allowsSorting
                                    key={'quantity'}
                                    onClick={() =>
                                        toggleSortDirection('quantity')
                                    }
                                >
                                    Quantity
                                </TableColumn>
                                <TableColumn
                                    align="center"
                                    allowsSorting
                                    key={'price'}
                                    onClick={() => toggleSortDirection('price')}
                                >
                                    Price
                                </TableColumn>
                                <TableColumn
                                    align="center"
                                    allowsSorting
                                    key={'storeID'}
                                    onClick={() =>
                                        toggleSortDirection('storeID')
                                    }
                                >
                                    Store ID
                                </TableColumn>
                                <TableColumn
                                    align="center"
                                    allowsSorting
                                    key={'saleDate'}
                                    onClick={() =>
                                        toggleSortDirection('saleDate')
                                    }
                                >
                                    Sale Date
                                </TableColumn>
                                <TableColumn
                                    align="center"
                                    allowsSorting
                                    key={'total'}
                                    onClick={() => toggleSortDirection('total')}
                                >
                                    Total
                                </TableColumn>
                            </TableHeader>
                            <TableBody
                                emptyContent={'No rows to display.'}
                                items={sortedData}
                            >
                                {(item) => (
                                    <TableRow key={item.saleID}>
                                        {(columnKey) => (
                                            <TableCell>
                                                {getKeyValue(item, columnKey)}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex justify-around flex-wrap items-center mt-5">
                        <Card className="bg-white my-3">
                            <PieChart
                                series={[
                                    {
                                        data: pieData,
                                        innerRadius: 30,
                                        outerRadius: 100,
                                        paddingAngle: 2,
                                        cornerRadius: 5,
                                        startAngle: -90,
                                        // endAngle: 180,
                                    },
                                ]}
                                width={800}
                                height={400}
                            />
                        </Card>
                    </div>
                </>
            ) : (
                <Restricted_view_component />
            )}
        </>
    );
}
