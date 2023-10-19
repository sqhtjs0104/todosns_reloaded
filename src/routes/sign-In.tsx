import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FirebaseError } from "firebase/app";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { styled } from "styled-components";

import { Wrapper, Title, Form, Input, Error, Switcher } from "../components/auth-compnents";
import ExternalLoginButton from "../components/external-login-button";

export default function SignUp() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { name, value } } = e;
		switch (name) {
			case "email": setEmail(value); break;
			case "password": setPassword(value); break;
			default: break;
		}
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		if (isLoading || email === "" || password === "") return;
		try {
			setIsLoading(true);
			await signInWithEmailAndPassword(auth, email, password);
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
			<Title>Sign into ☑️</Title>
			<Form onSubmit={onSubmit}>
				<Input name="email" value={email} placeholder="Email" type="email" onChange={onChange} required />
				<Input name="password" value={password} placeholder="Password" type="password" onChange={onChange} required />
				<Input name="submit" type="submit" value={isLoading ? "Loading..." : "Sign In"} />
			</Form>
			{error !== "" ? <Error>{error}</Error> : <></>}
			<Switcher>
				Don't have an account? <Link to="/signUp">Join to Us &rarr;</Link>
			</Switcher>
			<ExternalLoginButton target="google" />
			<ExternalLoginButton target="github" />
		</Wrapper>
	</>;
}