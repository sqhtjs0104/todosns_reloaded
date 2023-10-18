import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import auth from "../firebase";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { styled } from "styled-components";

import { Wrapper, Title, Form, Input, Error, Switcher } from "../components/auto-compnents";
import GoogleButton from "../components/google-button";
import GithubButton from "../components/github-button";

export default function SignUp() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        switch (name) {
            case "name": setName(value); break;
            case "email": setEmail(value); break;
            case "password": setPassword(value); break;
            default: break;
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || name === "" || email === "" || password === "") return;
        try {
            setIsLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(credentials.user, {
                displayName: name
            });
            navigate("/");
        } catch (error) {
            if (error instanceof FirebaseError) {
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return <>
        <Wrapper>
            <Title>Join Us☑️</Title>
            <Form onSubmit={onSubmit}>
                <Input name="name" value={name} placeholder="Name" type="text" onChange={onChange} required />
                <Input name="email" value={email} placeholder="Email" type="email" onChange={onChange} required />
                <Input name="password" value={password} placeholder="Password" type="password" onChange={onChange} required />
                <Input name="submit" type="submit" value={isLoading ? "Loading..." : "Create Account"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : <></>}
            <Switcher>
                Already have an account? <Link to="/signIn">Sign in &rarr;</Link>
            </Switcher>
            <GoogleButton />
            <GithubButton />
        </Wrapper>
    </>;
}