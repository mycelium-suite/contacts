import { useState, useEffect } from 'react'
import { LoginButton } from '@inrupt/solid-ui-react';
import { useSession } from "@inrupt/solid-ui-react";
import { useNavigate } from "react-router-dom";

// TODO : discover the idp from profile document
export function Auth() {

    const [idp, setIdp] = useState<string>("http://localhost:8000/"); //albert-einstein/profile/card#me");

    const navigate = useNavigate();
    const { session } = useSession();

    useEffect(() => {
        if (session.info.isLoggedIn) {
            navigate("/");
        }
    }, [session.info.isLoggedIn]);

    return (
        <>
            <input 
                type="text" 
                name="idp" 
                placeholder="Solid Identity Provider" 
                defaultValue={idp} 
                onChange={(e) => setIdp(e.target.value)} 
                //style={{width: "100%"}}
            />
            <LoginButton 
                oidcIssuer={idp} 
                redirectUrl="http://localhost:3000/login"
                onError={console.log}
            >
                <button>
                    Login
                </button>
            </LoginButton>
        </>
    );
}