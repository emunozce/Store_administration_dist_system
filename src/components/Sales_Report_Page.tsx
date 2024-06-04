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
} from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { UserInfo } from '../App';
import Loader from './Loader';

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
    isLoggedIn,
}: {
    userInfo: UserInfo;
    isLoggedIn: () => void;
}) {
    const [items, setItems] = useState<SalesData[]>([]);
    const [firstTimeLoaded, setFirstTimeLoaded] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const rowsPerPage = 10;
    const pages = Math.ceil(items.length / rowsPerPage);

    const itemsToDisplay = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return items.slice(start, end);
    }, [page, items]);

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

    isLoggedIn();

    if (!firstTimeLoaded) {
        getItems();
        setFirstTimeLoaded(true);
    }

    return (
        <>
            {userInfo.isLoggedIn ? (
                <div className="flex justify-center items-center mx-4 h-screen">
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
                                        onChange={(page) => setPage(page)}
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
                            >
                                Product
                            </TableColumn>
                            <TableColumn
                                align="center"
                                allowsSorting
                                key={'quantity'}
                            >
                                Quantity
                            </TableColumn>
                            <TableColumn
                                align="center"
                                allowsSorting
                                key={'price'}
                            >
                                Price
                            </TableColumn>
                            <TableColumn
                                align="center"
                                allowsSorting
                                key={'storeID'}
                            >
                                Store ID
                            </TableColumn>
                            <TableColumn
                                align="center"
                                allowsSorting
                                key={'saleDate'}
                            >
                                Sale Date
                            </TableColumn>
                            <TableColumn
                                align="center"
                                allowsSorting
                                key={'total'}
                            >
                                Total
                            </TableColumn>
                        </TableHeader>
                        <TableBody
                            emptyContent={'No rows to display.'}
                            items={itemsToDisplay}
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
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            )}
        </>
    );
}
