import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="py-4 px-4">
            <button onClick={() => loginWithRedirect()} className="btn btn-primary">
                <span>Iniciar Sesion</span>
            </button>
        </div>
    );
};

export default LoginButton;