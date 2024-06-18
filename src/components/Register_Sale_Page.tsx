import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Spacer,
    Select,
    SelectItem,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { UserInfo } from '../App';
import Restricted_view_component from './Restricted_view_component';

interface SalesData {
    product: string;
    price: number;
    quantity: number;
}

interface ProductData {
    ProductID: string;
    category: string;
    name: string;
    price: number;
    storeID: string;
}

interface ErrorData {
    message: string;
}

export default function Register_Sale_Page({
    userInfo,
}: {
    userInfo: UserInfo;
}) {
    const [items, setItems] = useState<ProductData[]>([]);
    const [selectedItem, setSelectedItem] = useState<ProductData>({
        ProductID: '',
        category: '',
        name: '',
        price: 0,
        storeID: '',
    });
    const [firstTimeLoaded, setFirstTimeLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isInvalid, setIsInvalid] = useState<ErrorData | null>(null);

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SalesData>({
        defaultValues: {
            product: '',
            price: 0,
            quantity: 0,
        },
    });

    const getItems = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/products`,
            );

            const array: ProductData[] = response.data.body;

            setItems(array.filter((obj) => obj.storeID === userInfo.storeID));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data);
            }
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        if (!selectedItem.ProductID) {
            setIsInvalid({
                message: 'Please select a product.',
            });
            return;
        }

        const jsonUserData = {
            product: selectedItem.name,
            price: selectedItem.price,
            quantity: data.quantity,
            total: selectedItem.price * data.quantity,
            store_id: userInfo.storeID,
        };

        try {
            setIsLoading(true);
            await axios.post(
                `${import.meta.env.VITE_API_ENDPOINT}/sales`,
                jsonUserData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            setTimeout(() => {
                setIsLoading(false);
                navigate('/');
            }, 1000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsInvalid(error?.response?.data);
            }
        }
    });

    const onChangeItem = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedItem = items.find(
            (item) => item.ProductID === e.target.value,
        );
        if (selectedItem) {
            setSelectedItem(selectedItem);
        }
    };

    if (!firstTimeLoaded) {
        getItems();
        setFirstTimeLoaded(true);
    }

    return (
        <>
            {userInfo.isLoggedIn ? (
                <>
                    {isLoading ? (
                        <div className="my-32 sm:mb-0 md:mt-60 md:mb-10 lg:mb-0">
                            <Loader />
                        </div>
                    ) : (
                        <div className="flex justify-center items-center">
                            <Card className="w-10/12 md:w-7/12 lg:w-5/12 my-24 sm:mt-20 sm:mb-0 md:mt-40 md:mb-10">
                                <CardHeader>
                                    <h4 className="text-3xl text-blue-500 font-bold hover:cursor-default">
                                        Make a Sale
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    {isInvalid && (
                                        <p className="text-red-600">
                                            {isInvalid?.message}
                                        </p>
                                    )}
                                    <Spacer y={3} />
                                    <form
                                        onSubmit={onSubmit}
                                        className="flex flex-col justify-center"
                                        noValidate
                                    >
                                        <Select
                                            label="Product name"
                                            labelPlacement="outside"
                                            onChange={onChangeItem}
                                        >
                                            {items.map((item) => (
                                                <SelectItem
                                                    key={item.ProductID}
                                                >
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <Spacer y={2}></Spacer>
                                        <div className="flex flex-row">
                                            <Input
                                                type="text"
                                                label="Price"
                                                labelPlacement="outside"
                                                placeholder={selectedItem.price.toString()}
                                                disabled
                                                startContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <span className="text-default-400 text-small">
                                                            $
                                                        </span>
                                                    </div>
                                                }
                                            />
                                            <Spacer x={2} />
                                            <Input
                                                {...register('quantity', {
                                                    required:
                                                        'Quantity is required',
                                                    min: {
                                                        value: 1,
                                                        message:
                                                            'Should be more than 0.',
                                                    },
                                                    pattern: {
                                                        value: /^[1-9]\d*$/,
                                                        message:
                                                            'Invalid quantity.',
                                                    },
                                                })}
                                                isInvalid={
                                                    errors.quantity
                                                        ? true
                                                        : false
                                                }
                                                errorMessage={
                                                    errors.quantity?.message
                                                }
                                                type="number"
                                                label="Quantity"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                        <Spacer y={2}></Spacer>
                                        <Input
                                            type="text"
                                            label="Category"
                                            labelPlacement="outside"
                                            placeholder={selectedItem.category}
                                            disabled
                                        />
                                        <Spacer y={2}></Spacer>
                                        <Input
                                            type="text"
                                            label="Store"
                                            labelPlacement="outside"
                                            placeholder={userInfo.storeID}
                                            disabled
                                        />

                                        <Spacer y={6}></Spacer>
                                        <Button
                                            type="submit"
                                            className="self-center w-4/12 bg-blue-500 font-semibold mb-4"
                                        >
                                            Register Sale
                                        </Button>
                                    </form>
                                </CardBody>
                            </Card>
                        </div>
                    )}
                </>
            ) : (
                <Restricted_view_component />
            )}
        </>
    );
}
