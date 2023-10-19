import PostTodoForm from "../components/post-todo-form";
import { styled } from "styled-components";

const Wrapper = styled.div`
    
`;

export default function Home() {
    return <>
        <Wrapper>
            <PostTodoForm />
        </Wrapper>
    </>
}