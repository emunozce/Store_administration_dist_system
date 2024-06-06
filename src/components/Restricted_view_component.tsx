import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/browser-error.svg';

export default function Restricted_view_component() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center my-56">
            <Card className="bg-white py-4 w-72">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <p className="text-tiny text-black uppercase font-bold">
                        Access Restricted
                    </p>
                    <div></div>
                </CardHeader>
                <CardBody className="flex justify-center items-center">
                    <p className="text-black my-6">
                        Login to get access to the info!
                    </p>
                    <img src={Logo} alt="Logo" className="w-16 h-16" />
                </CardBody>
                <CardFooter className="flex justify-center items-center">
                    <Button
                        color="primary"
                        onPress={() => {
                            // Handle login redirection
                            navigate('/login');
                        }}
                    >
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
