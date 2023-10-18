import { styled } from "styled-components";

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

const Text = styled.span`
    font-size: 24px;
`;

export default function LoadingScreen() {
    return <Wrapper><Text>Loading...</Text></Wrapper>
}