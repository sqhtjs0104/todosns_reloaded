import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../firebase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { Button, Logo } from "./auth-compnents";

export default function ExternalLoginButton(props: { target: string }) {
    const navigate = useNavigate();

    const [src, setSrc] = useState("");
    useEffect(() => {
        switch (props.target) {
            case "google": setSrc("/google-logo.png"); break;
            case "github": setSrc("/github-logo.svg"); break;
            default: break;
        }
    }, []);

    const onClick = async () => {
        try {
            let provider = null;
            switch (props.target) {
                case "google": provider = new GoogleAuthProvider(); break;
                case "github": provider = new GithubAuthProvider(); break;
                default: break;
            }
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return <>
        <Button onClick={onClick}>
            <Logo src={src} />
            Continue with Google
        </Button>
    </>
}