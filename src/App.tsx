import { NextUIProvider } from '@nextui-org/react';
import Navbar from './components/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home_Page from './components/Home_Page';
import Sales_Report_Page from './components/Sales_Report_Page';
import Register_Sale_Page from './components/Register_Sale_Page';
import { useState } from 'react';
import Sign_up_page from './components/Sign_up_page';
import Login_Page from './components/Login_page';

export interface UserInfo {
    name: string;
    lastname: string;
    role: string;
    storeID: string | undefined;
    isLoggedIn: boolean;
    shouldRemember: boolean;
}

function App() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: '',
        lastname: '',
        role: '',
        storeID: undefined,
        isLoggedIn: false,
        shouldRemember: false,
    });

    const handleLogout = () => {
        userInfo.shouldRemember ? localStorage.clear() : sessionStorage.clear(); // Clear storage wether it is local or session
        setUserInfo({
            ...userInfo,
            name: '',
            lastname: '',
            role: '',
            storeID: undefined,
            isLoggedIn: false,
            shouldRemember: false,
        }); // Delete user info
    };

    const handleLogin = (
        name: string,
        lastname: string,
        role: string,
        storeID: string | undefined,
        isRemembered: boolean,
    ) => {
        setUserInfo({
            ...userInfo,
            name: name,
            lastname: lastname,
            role: role,
            storeID: storeID!,
            shouldRemember: isRemembered,
            isLoggedIn: true,
        }); // Set user info
    };

    const isRemembered = () => {
        if (localStorage.length > 0 && !userInfo.isLoggedIn) {
            setUserInfo({
                ...userInfo,
                name: localStorage.getItem('name')!,
                lastname: localStorage.getItem('lastname')!,
                role: localStorage.getItem('role')!,
                storeID: localStorage.getItem('storeID')!,
                isLoggedIn: true,
                shouldRemember: true,
            }); // Set user info
            return;
        } else if (sessionStorage.length > 0 && !userInfo.isLoggedIn) {
            setUserInfo({
                ...userInfo,
                name: sessionStorage.getItem('name')!,
                lastname: sessionStorage.getItem('lastname')!,
                role: sessionStorage.getItem('role')!,
                storeID: sessionStorage.getItem('storeID')!,
                isLoggedIn: true,
                shouldRemember: false,
            }); // Set user info
            return;
        }
        return;
    };

    isRemembered(); // Check if there is user data in storage at first web page start up

    const isLoggedIn = () => {
        if (!userInfo.isLoggedIn) {
            navigate('/login');
        }
    };

    return (
        <>
            <NextUIProvider navigate={navigate}>
                <Navbar userInfo={userInfo} handleLogout={handleLogout} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home_Page
                                userInfo={userInfo}
                                isLoggedIn={isLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/register-sale"
                        element={
                            <Register_Sale_Page
                                userInfo={userInfo}
                                isLoggedIn={isLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/sales-report"
                        element={
                            <Sales_Report_Page
                                userInfo={userInfo}
                                isLoggedIn={isLoggedIn}
                            />
                        }
                    />
                    <Route path="/signup" element={<Sign_up_page />} />
                    <Route
                        path="/login"
                        element={<Login_Page handleLogin={handleLogin} />}
                    />
                </Routes>
            </NextUIProvider>
        </>
    );
}

export default App;
