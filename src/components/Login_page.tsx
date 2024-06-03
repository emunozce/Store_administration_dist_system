import Login_form from './Login_form';

export default function Login_page({
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
    return <Login_form handleLogin={handleLogin} />;
}
