// import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Button,
    Spacer,
} from '@nextui-org/react';
// import { useForm } from 'react-hook-form';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface SalesData {
//     name: string;
//     quantity: number;
//     price: number;
//     store_id: number;
// }

// interface ErrorData {
//     message: string;
// }

export default function Register_Sale_Page() {
    // const [isInvalid, setIsInvalid] = useState<ErrorData | null>(null);
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<SalesData>({
    //     defaultValues: {
    //         name: '',
    //         quantity: 0,
    //         price: 0,
    //         store_id: 1, // Sustituir por el id del usuario logueado
    //     },
    // });

    // const onSubmit = handleSubmit(async (data) => {
    //     try {
    //         const response = await axios.post('', data);

    //         if (response.status === 201) {
    //             navigate('/sales-report');
    //         }
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             setIsInvalid(error.response?.data);
    //         }
    //     }
    // });
    return (
        <>
            <div className="flex justify-center items-center">
                <Card className="w-10/12 md:w-7/12 lg:w-5/12 my-32 sm:mb-0 md:mt-60 md:mb-24 lg:mb-4">
                    <CardHeader>
                        <h4 className="text-3xl text-green-500 font-bold hover:cursor-default">
                            Make a Sale
                        </h4>
                    </CardHeader>
                    <CardBody>
                        {/* {isInvalid && (
                        <p className="text-red-600">{isInvalid?.message}</p>
                    )} */}
                        <Spacer y={3} />
                        <form
                            // onSubmit={onSubmit}
                            className="flex flex-col justify-center items-center"
                            noValidate
                        >
                            <Input
                                // {...register('email', {
                                //     required: 'Email is required',
                                //     pattern: {
                                //         value: /^\S+@\S+\.\S+$/,
                                //         message: 'Invalid email',
                                //     },
                                // })}
                                // isInvalid={errors.email ? true : false}
                                // errorMessage={errors.email?.message}
                                type="text"
                                label="Item"
                                isClearable={true}
                                labelPlacement="outside"
                            />

                            <Spacer y={6}></Spacer>
                            <Input
                                type="number"
                                label="Price"
                                placeholder="0.00"
                                labelPlacement="outside"
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">
                                            $
                                        </span>
                                    </div>
                                }
                            />
                            <Spacer y={6}></Spacer>
                            <Button
                                type="submit"
                                className="w-4/12 bg-green-500 font-semibold mb-4"
                            >
                                Register
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
