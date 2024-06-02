import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Link,
    Avatar,
    Tooltip,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export default function NavbarComponent() {
    const navigate = useNavigate();

    return (
        <Navbar
            className="flex bg-zinc-700"
            shouldHideOnScroll={true}
            maxWidth="full"
        >
            <NavbarContent justify="center">
                <NavbarItem className="md:pr-3">
                    <Link
                        className="text-green-500 font-semibold text-sm sm:text-base"
                        isBlock
                        onPress={() => navigate('/')}
                    >
                        Store Administration System
                    </Link>
                    {/* <Link
                        className="text-green-500 font-semibold text-sm sm:text-base"
                        isBlock
                        onPress={() => navigate('/sales-report')}
                    >
                        Sales Report
                    </Link>
                    <Link
                        className="text-green-500 font-semibold text-sm sm:text-base"
                        isBlock
                        onPress={() => navigate('/register-sale')}
                    >
                        Make a Sale
                    </Link> */}
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="center">
                <>
                    <NavbarItem className="md:pr-3 hidden sm:block"></NavbarItem>
                    <NavbarItem className="md:pr-3 hidden sm:block">
                        <Tooltip
                            className="bg-green-500 text-black font-semibold"
                            placement="left"
                            offset={15}
                        >
                            <Avatar showFallback color={'success'} />
                        </Tooltip>
                    </NavbarItem>
                    <NavbarItem className="md:pl-3"></NavbarItem>
                </>
            </NavbarContent>
        </Navbar>
    );
}
