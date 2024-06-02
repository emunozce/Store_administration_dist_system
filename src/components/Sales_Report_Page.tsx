// import axios from 'axios';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    Spacer,
} from '@nextui-org/react';
// import { useState } from 'react';

export default function App() {
    // const [items, setItems] = useState([]);

    // const getItems = async () => {
    //     try {
    //         const response = await axios.get('');

    //         const items = JSON.parse(response.data);
    //         setItems(items);
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             console.error('Error:', error.response?.data);
    //         }
    //     }
    // };

    // getItems();

    return (
        <div className="mx-4">
            <Spacer y={7} />
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn align="center" allowsSorting={true}>
                        Producto
                    </TableColumn>
                    <TableColumn align="center" allowsSorting={true}>
                        Cantidad
                    </TableColumn>
                    <TableColumn align="center" allowsSorting={true}>
                        Precio
                    </TableColumn>
                </TableHeader>
                <TableBody emptyContent={'No rows to display.'}>
                    {/* Aqui se manda a llamar al arrray de JSON */}
                </TableBody>
            </Table>
        </div>
    );
}
