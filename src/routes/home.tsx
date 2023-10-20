import PostTodoForm from "../components/post-todo-form";
import { styled } from "styled-components";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
    display: grid;
    gap: 50px;
    grid-template-rows: 1fr 5fr;
    overflow-y: scroll;
    
    &::-webkit-scrollbar {
        width: 0;
    }
`;

export default function Home() {
    return <>
        <Wrapper>
            <PostTodoForm />
            <Timeline />
        </Wrapper>
    </>
}