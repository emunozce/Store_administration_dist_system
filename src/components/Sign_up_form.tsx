import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Link,
    Button,
    Spacer,
    Select,
    SelectItem,
} from '@nextui-org/react';
import Loader from './Loader';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

interface SignUpData {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirm_password: string;
}

interface StoreData {
    StoreID: string;
    Name: string;
    Location: string;
}

interface ErrorData {
    error: string;
}

export default function Sign_up_form() {
    const [stores, setStores] = useState<StoreData[]>([]);
    const [selectedStore, setSelectedStore] = useState<StoreData>({
        StoreID: '',
        Name: '',
        Location: '',
    });
    const [firstTimeLoaded, setFirstTimeLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isInvalid, setIsInvalid] = useState<ErrorData | null>(null);
    const [role, setRole] = useState('');

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<SignUpData>({
        defaultValues: {
            name: '',
            lastname: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    });

    const getStores = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/stores`,
            );

            const array: StoreData[] = response.data.body;

            setStores(array);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data);
            }
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        let jsonUserData = {};

        if (role === 'storeManager') {
            jsonUserData = {
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: data.password,
                role: role,
                storeID: selectedStore.StoreID,
            };
        } else {
            jsonUserData = {
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: data.password,
                role: role,
            };
        }

        try {
            setIsLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_API_ENDPOINT}/users`,
                jsonUserData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (response.data.status === 201) {
                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/login');
                }, 1000);
            } else {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
                const error: ErrorData = JSON.parse(response.data.body);
                setIsInvalid(error);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
                setIsInvalid(error?.response?.data);
            }
        }
    });

    const handleRoleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRole(e.target.value);
    };

    const handleStoreSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        stores.forEach((store) => {
            if (store.StoreID === e.target.value) {
                setSelectedStore(store);
            }
        });
    };

    const roles = [
        { value: 'admin', label: 'Admin' },
        { value: 'storeManager', label: 'Store Manager' },
    ];

    if (!firstTimeLoaded) {
        getStores();
        setFirstTimeLoaded(true);
    }

    return (
        <>
            <div className="flex justify-center items-center">
                {isLoading ? (
                    <div className="my-32 sm:mb-0 md:mt-60 md:mb-10 lg:mb-0">
                        <Loader />
                    </div>
                ) : (
                    <Card className="w-10/12 md:w-7/12 lg:w-5/12 my-24 sm:mt-20 sm:mb-0 md:mt-32 md:mb-10">
                        <CardHeader>
                            <h4 className="text-3xl text-blue-500 font-bold hover:cursor-default">
                                Sign Up
                            </h4>
                        </CardHeader>
                        <CardBody>
                            {isInvalid && (
                                <p className="text-red-600">
                                    {isInvalid?.error}
                                </p>
                            )}
                            <Spacer y={3} />
                            <form
                                onSubmit={onSubmit}
                                className="flex flex-col justify-center"
                                noValidate
                            >
                                <div className="flex flex-row">
                                    <Input
                                        {...register('name', {
                                            required: 'Name is required',
                                            minLength: {
                                                value: 2,
                                                message:
                                                    'Name should be more than 1 letter.',
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z' ]+$/,
                                                message: 'Invalid name',
                                            },
                                        })}
                                        isInvalid={errors.name ? true : false}
                                        errorMessage={errors.name?.message}
                                        type="text"
                                        label="Name"
                                        labelPlacement="outside"
                                    />
                                    <Spacer x={2} />
                                    <Input
                                        {...register('lastname', {
                                            required: 'Lastname is required',
                                            minLength: {
                                                value: 2,
                                                message:
                                                    'Lastname should be more than 1 letter.',
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z' ]+$/,
                                                message: 'Invalid lastname',
                                            },
                                        })}
                                        isInvalid={
                                            errors.lastname ? true : false
                                        }
                                        errorMessage={errors.lastname?.message}
                                        type="text"
                                        label="Lastname"
                                        labelPlacement="outside"
                                    />
                                </div>
                                <Spacer y={2}></Spacer>
                                <Input
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                                            message: 'Invalid email',
                                        },
                                    })}
                                    isInvalid={errors.email ? true : false}
                                    errorMessage={errors.email?.message}
                                    type="email"
                                    label="Email"
                                    labelPlacement="outside"
                                />
                                <Spacer y={2}></Spacer>
                                <Input
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message:
                                                'Password must be at least 8 characters long',
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/,
                                            message:
                                                'Password must include uppercase, lowercase, number, and special character',
                                        },
                                    })}
                                    isInvalid={errors.password ? true : false}
                                    errorMessage={errors.password?.message}
                                    type="password"
                                    label="Password"
                                    labelPlacement="outside"
                                />
                                <Spacer y={2}></Spacer>
                                <Input
                                    {...register('confirm_password', {
                                        required:
                                            'Password confirmation is required',
                                        validate: (value) =>
                                            value === getValues('password') ||
                                            'The confirmation password does not match the password entered.',
                                    })}
                                    isInvalid={
                                        errors.confirm_password ? true : false
                                    }
                                    errorMessage={
                                        errors.confirm_password?.message
                                    }
                                    type="password"
                                    label="Confirm your Password"
                                    labelPlacement="outside"
                                />
                                <Spacer y={2}></Spacer>
                                <Select
                                    className="dark"
                                    label="Role"
                                    labelPlacement="outside"
                                    placeholder="Select your role"
                                    onChange={handleRoleSelectionChange}
                                >
                                    {roles.map((role) => (
                                        <SelectItem key={role.value}>
                                            {role.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {role == 'storeManager' && (
                                    <>
                                        <Spacer y={2}></Spacer>
                                        <Select
                                            className="dark"
                                            label="Store"
                                            labelPlacement="outside"
                                            placeholder="Select your store"
                                            required
                                            onChange={
                                                handleStoreSelectionChange
                                            }
                                        >
                                            {stores.map((store) => (
                                                <SelectItem key={store.StoreID}>
                                                    {store.Name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        <Spacer y={2}></Spacer>
                                        <div className="flex flex-row">
                                            <Input
                                                label="Store ID"
                                                labelPlacement="outside"
                                                placeholder={
                                                    selectedStore.StoreID
                                                }
                                                disabled
                                            />
                                            <Spacer x={2} />
                                            <Input
                                                label="Location"
                                                labelPlacement="outside"
                                                placeholder={
                                                    selectedStore.Location
                                                }
                                                disabled
                                            />
                                        </div>
                                    </>
                                )}
                                <Spacer y={6}></Spacer>
                                <Button
                                    type="submit"
                                    className="self-center w-4/12 bg-blue-500 font-semibold"
                                >
                                    Sign Up
                                </Button>
                            </form>
                        </CardBody>
                        <CardFooter>
                            <p className="hover:cursor-default">
                                Already have an account?
                            </p>
                            <Spacer x={2} />
                            <Link
                                onPress={() => navigate('/login')}
                                className="text-blue-500 font-semibold hover:cursor-pointer"
                            >
                                Login
                            </Link>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </>
    );
}
