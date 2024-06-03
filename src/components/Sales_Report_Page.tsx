import axios from 'axios';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    Spacer,
    TableRow,
    TableCell,
    getKeyValue,
    Pagination,
} from '@nextui-org/react';
import { useMemo, useState } from 'react';

interface ProductData {
    ProductID: string;
    Category: string;
    Name: string;
    Price: number;
    StoreID: string;
}

export default function App() {
    const [items, setItems] = useState<ProductData[]>([]);
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
                `${import.meta.env.VITE_API_ENDPOINT}/products`,
            );

            const array: ProductData[] = response.data.body;

            setTotal(
                calculateTotal(
                    array.filter((obj) => obj.StoreID === 'Store001'),
                ),
            );

            setItems(array.filter((obj) => obj.StoreID === 'Store001'));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data);
            }
        }
    };

    const calculateTotal = (items: ProductData[]) => {
        return items.reduce((acc, item) => acc + item.Price, 0);
    };

    if (!firstTimeLoaded) {
        getItems();
        setFirstTimeLoaded(true);
    }

    return (
        <div className="mx-4">
            <Spacer y={7} />
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
                            <div>Sales Total: ${total}</div>
                        </div>
                    </>
                }
            >
                <TableHeader>
                    <TableColumn align="center" allowsSorting key={'ProductID'}>
                        ProductID
                    </TableColumn>
                    <TableColumn align="center" allowsSorting key={'Name'}>
                        Name
                    </TableColumn>
                    <TableColumn align="center" allowsSorting key={'Category'}>
                        Category
                    </TableColumn>
                    <TableColumn align="center" allowsSorting key={'Price'}>
                        Price
                    </TableColumn>
                    <TableColumn align="center" allowsSorting key={'StoreID'}>
                        StoreID
                    </TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={'No rows to display.'}
                    items={itemsToDisplay}
                >
                    {(item) => (
                        <TableRow key={item.ProductID}>
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
    );
}
