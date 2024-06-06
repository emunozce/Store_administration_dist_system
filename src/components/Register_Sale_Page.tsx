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
import Restrited_view_component from './Restricted_view_component';

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
    const [item, setItem] = useState<ProductData>({
        ProductID: '',
        category: '',
        name: '',
        price: 0,
        storeID: '',
    });
    const [firstTimeLoaded, setFirstTimeLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isInvalid, setIsInvalid] = useState<ErrorData | null>(null);
    const [value, setValue] = useState('');
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

    let isStoreManager = false;

    if (userInfo.role === 'storeManager') {
        isStoreManager = true;
    }

    const getItems = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/products`,
            );

            const array: ProductData[] = response.data.body;

            if (userInfo.storeID !== undefined) {
                setItems(
                    array.filter((obj) => obj.storeID === userInfo.storeID),
                );
            } else {
                setItems(array.filter((obj) => obj.storeID === value));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data);
            }
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        const jsonUserData = {
            product: item.name,
            price: item.price,
            quantity: data.quantity,
            total: item.price * data.quantity,
            store_id: userInfo.storeID,
        };

        console.log(jsonUserData);

        try {
            setIsLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_API_ENDPOINT}/sales`,
                jsonUserData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            console.log(response.data);

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
            setItem(selectedItem);
        }
    };

    if (!firstTimeLoaded) {
        getItems();
        setFirstTimeLoaded(true);
    }

    const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
    };

    const stores = [
        { value: 'store001', label: 'Store 001' },
        { value: 'store002', label: 'Store 002' },
        { value: 'store003', label: 'Store 003' },
        { value: 'store004', label: 'Store 004' },
    ];

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
                                            className="dark"
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
                                                placeholder={item.price.toString()}
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
                                        {isStoreManager ? (
                                            <>
                                                <Input
                                                    type="text"
                                                    label="Category"
                                                    labelPlacement="outside"
                                                    placeholder={item.category}
                                                    disabled
                                                />
                                                <Spacer y={2}></Spacer>
                                                <Input
                                                    // className="dark"
                                                    label="Store"
                                                    labelPlacement="outside"
                                                    defaultValue={
                                                        userInfo.storeID
                                                    }
                                                    disabled
                                                />
                                            </>
                                        ) : (
                                            <Select
                                                // className="dark"
                                                label="Store"
                                                labelPlacement="outside"
                                                placeholder="Select your Store"
                                                onChange={handleSelectionChange}
                                            >
                                                {stores.map((store) => (
                                                    <SelectItem
                                                        key={store.value}
                                                    >
                                                        {store.label}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        )}
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
                <Restrited_view_component />
            )}
        </>
    );
}
