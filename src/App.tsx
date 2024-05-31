import { NextUIProvider } from '@nextui-org/react';
import Navbar from './components/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home_Page from './components/Home_Page';
import Sales_Report_Page from './components/Sales_Report_Page';
import Register_Sale_Page from './components/Register_Sale_Page';

Navbar;

function App() {
    const navigate = useNavigate();

    return (
        <>
            <NextUIProvider navigate={navigate}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home_Page />} />
                    <Route
                        path="/register-sale"
                        element={<Register_Sale_Page />}
                    />
                    <Route
                        path="/sales-report"
                        element={<Sales_Report_Page />}
                    />
                </Routes>
            </NextUIProvider>
        </>
    );
}

export default App;
