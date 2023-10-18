import { styled } from "styled-components";

export const errors = {
	"auth/email-already-in-use": "That email already exists."
}

export const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	width: 420px;
	padding: 50px 0;
`;

export const Title = styled.h1`
	font-size: 42px;
`;

export const Form = styled.form`
	margin-top: 50px;
	display: flex;
	flex-flow: column nowrap;
	gap: 10px;
	width: 100%;
	margin-bottom: 10px;
`;

export const Input = styled.input`
	padding: 10px 20px;
	border-radius: 50px;
	border: none;
	width: 100%;
	font-size: 16px;
	&[type="submit"] {
			cursor: pointer;
			&:hover {
					opacity: 0.9;
			}
	}
`;

export const Error = styled.span`
	font-weight: 600;
	color: tomato;
`;

export const Switcher = styled.span`
margin: 20px 0;
a {
	color: #1d9bf0;
}
`;

export const Button = styled.span`
	margin-top: 10px;
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

export const Logo = styled.img`
    height: 25px;
`;