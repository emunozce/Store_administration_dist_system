import { Button } from '@nextui-org/react';
import { UserInfo } from '../App';
import { useNavigate } from 'react-router-dom';

export default function Home_Page({ userInfo }: { userInfo: UserInfo }) {
    const navigate = useNavigate();

    let isAdmin = '';

    if (userInfo.role === 'admin') {
        isAdmin =
            'bg-green-500 hidden text-slate-950 w-96 h-96 text-4xl my-8 lg:my-52';
    } else {
        isAdmin =
            'bg-green-500 text-slate-950 w-96 h-96 text-4xl my-8 lg:my-52';
    }

    return (
        <>
            {userInfo.isLoggedIn ? (
                <div className="flex flex-col justify-around items-center sm:flex-col lg:flex-row h-full">
                    <Button
                        className={isAdmin}
                        color="secondary"
                        onPress={() => navigate('/register-sale')}
                    >
                        Make a Sale
                    </Button>
                    <Button
                        className="bg-blue-600 text-slate-950 w-96 h-96 text-4xl my-8 lg:my-52"
                        onPress={() => navigate('/sales-report')}
                    >
                        Sales Reports
                    </Button>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <div className="text-blue-500 text-5xl">
                        Log in to get info about stores and sales!
                    </div>
                </div>
            )}
        </>
    );
}
