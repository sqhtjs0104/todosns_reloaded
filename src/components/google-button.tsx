import { useNavigate } from "react-router-dom";
import auth from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";

const Button = styled.span`
margin-top: 30px;
    background: white;
    font-weight: 500;
    width: 100%;
    color: black;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const Logo = styled.img`
    height: 25px;
`;

export default function GoogleButton() {
    const navigate = useNavigate();

    const onClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return <>
        <Button onClick={onClick}>
            <Logo src="/google-logo.png" />
            Continue with Google
        </Button>
    </>
}