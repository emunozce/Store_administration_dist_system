import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { signOut } from 'aws-amplify/auth';

function App() {
    return (
        <>
            <div>
                <Authenticator>
                    {({ signOut, user }) => (
                        <button onClick={signOut}>Sign Out</button>
                    )}
                    <h1 className="text-3xl font-bold text">Hola Puto Iker</h1>
                </Authenticator>
            </div>
        </>
    );
}

export default App;
