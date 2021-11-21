import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <div className="d-flex align-items-center bd-highlight mb-3 example-parent" style={{ height: '150px' }}>
            <button onClick={() =>logout({returnTo:window.location.origin})} className="btn btn-primary">
                <span>Logout</span> 
            </button>
        </div>
    )
};

export default LogoutButton;