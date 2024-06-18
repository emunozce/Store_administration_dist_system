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
    Checkbox,
} from '@nextui-org/react';
import Loader from './Loader';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from '../App';

interface LoginData {
    email: string;
    password: string;
}

interface ErrorData {
    error: string;
}

export default function Login_form({
    handleLogin,
}: {
    handleLogin: (
        name: string,
        lastname: string,
        role: string,
        storeID: string | undefined,
        isRemembered: boolean,
    ) => void;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isInvalid, setIsInvalid] = useState<ErrorData | null>(null);
    const [isRememberLogInInfo, setRememberLogInInfo] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        const jsonUserData = JSON.stringify({
            email: data.email,
            password: data.password,
        });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_ENDPOINT}/login`,
                jsonUserData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            const jsonResponse: UserInfo = JSON.parse(response.data.body);

            if (response.data.status === 200) {
                if (isRememberLogInInfo) {
                    // If selected, save to local storage
                    localStorage.setItem('name', jsonResponse.name);
                    localStorage.setItem('lastname', jsonResponse.lastname);
                    localStorage.setItem('role', jsonResponse.role);
                    if (jsonResponse.storeID !== undefined) {
                        localStorage.setItem('storeID', jsonResponse.storeID);
                    }
                } else {
                    // If not selected, save to session storage
                    sessionStorage.setItem('name', jsonResponse.name);
                    sessionStorage.setItem('lastname', jsonResponse.lastname);
                    sessionStorage.setItem('role', jsonResponse.role);
                    if (jsonResponse.storeID !== undefined) {
                        sessionStorage.setItem('storeID', jsonResponse.storeID);
                    }
                }

                handleLogin(
                    jsonResponse.name,
                    jsonResponse.lastname,
                    jsonResponse.role,
                    jsonResponse.storeID,
                    isRememberLogInInfo,
                ); // Set user info

                setIsLoading(false);
                navigate('/'); // Redirect to home page
            } else {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
                const error: ErrorData = JSON.parse(response.data.body);
                setIsInvalid(error);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsInvalid(error?.response?.data);
            }
        }
    });

    return (
        <>
            <div className="flex justify-center items-center">
                {isLoading ? (
                    <div className="my-32 sm:mb-0 md:mt-60 md:mb-10 lg:mb-0">
                        <Loader />
                    </div>
                ) : (
                    <Card className="w-10/12 md:w-7/12 lg:w-5/12 my-32 sm:mb-0 md:mt-40 md:mb-24 lg:mb-4">
                        <CardHeader>
                            <h4 className="text-3xl text-blue-500 font-bold hover:cursor-default">
                                Login
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
                                className="flex flex-col justify-center items-center"
                                noValidate
                            >
                                <Input
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+\.\S+$/,
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
                                    })}
                                    isInvalid={errors.password ? true : false}
                                    errorMessage={errors.password?.message}
                                    type="password"
                                    label="Password"
                                    labelPlacement="outside"
                                />
                                <Spacer y={6}></Spacer>

                                <Checkbox
                                    color="primary"
                                    onValueChange={setRememberLogInInfo}
                                >
                                    Remember Me
                                </Checkbox>

                                <Spacer y={6}></Spacer>

                                <Button
                                    type="submit"
                                    className="w-4/12 bg-blue-500 font-semibold"
                                >
                                    Login
                                </Button>
                            </form>
                        </CardBody>
                        <CardFooter>
                            <p className="hover:cursor-default">
                                Don't have an account?
                            </p>
                            <Spacer x={2} />
                            <Link
                                onPress={() => navigate('/signup')}
                                className="text-blue-500 font-semibold hover:cursor-pointer"
                            >
                                Sign Up
                            </Link>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </>
    );
}
