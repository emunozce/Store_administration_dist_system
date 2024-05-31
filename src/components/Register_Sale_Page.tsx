import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Spacer,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

interface SalesData {
    product: string;
    price: number;
    quantity: number;
}

interface ErrorData {
    message: string;
}

export default function Register_Sale_Page() {
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

    const onSubmit = handleSubmit(async (data) => {
        const jsonUserData = {
            product: data.product.toLowerCase(),
            price: data.price,
            quantity: data.quantity,
            total: data.price * data.quantity,
            store_id: 1,
        };

        console.log('jsonUserData: ', jsonUserData);

        try {
            setIsLoading(true);
            await axios.post(`endpoint/signup`, jsonUserData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setTimeout(() => {
                setIsLoading(false);
                navigate;
            }, 1000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsInvalid(error?.response?.data);
            }
        }
    });

    return (
        <>
            {isLoading ? (
                <div className="my-32 sm:mb-0 md:mt-60 md:mb-10 lg:mb-0">
                    <Loader />
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <Card className="w-10/12 md:w-7/12 lg:w-5/12 my-24 sm:mt-20 sm:mb-0 md:mt-40 md:mb-10">
                        <CardHeader>
                            <h4 className="text-3xl text-green-500 font-bold hover:cursor-default">
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
                                <Input
                                    {...register('product', {
                                        required: 'Product name is required',
                                        pattern: {
                                            value: /^[A-Za-z]/i,
                                            message: 'Invalid product name.',
                                        },
                                    })}
                                    isInvalid={errors.product ? true : false}
                                    errorMessage={errors.product?.message}
                                    type="text"
                                    label="Product name"
                                    labelPlacement="outside"
                                />
                                <Spacer y={2}></Spacer>
                                <div className="flex flex-row">
                                    <Input
                                        {...register('price', {
                                            required: 'Price is required',
                                            min: {
                                                value: 0.01,
                                                message:
                                                    'Should be more than $0.00.',
                                            },
                                            pattern: {
                                                value: /^[0-9.]+$/i,
                                                message: 'Invalid price.',
                                            },
                                        })}
                                        isInvalid={errors.price ? true : false}
                                        errorMessage={errors.price?.message}
                                        type="number"
                                        label="Price"
                                        labelPlacement="outside"
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
                                            required: 'Quantity is required',
                                            min: {
                                                value: 1,
                                                message:
                                                    'Should be more than 0.',
                                            },
                                            pattern: {
                                                value: /^[1-9]\d*$/,
                                                message: 'Invalid quantity.',
                                            },
                                        })}
                                        isInvalid={
                                            errors.quantity ? true : false
                                        }
                                        errorMessage={errors.quantity?.message}
                                        type="number"
                                        label="Quantity"
                                        labelPlacement="outside"
                                    />
                                </div>
                                <Spacer y={6}></Spacer>
                                <Button
                                    type="submit"
                                    className="self-center w-4/12 bg-green-500 font-semibold mb-4"
                                >
                                    Register Sale
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            )}
        </>
    );
}
