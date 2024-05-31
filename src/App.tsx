import { NextUIProvider } from '@nextui-org/react';
import Navbar from './components/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home_Page from './components/Home_Page';

Navbar;

function App() {
    const navigate = useNavigate();

    return (
        <>
            <NextUIProvider navigate={navigate}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home_Page />} />
                </Routes>
            </NextUIProvider>
        </>
    );
}

export default App;
