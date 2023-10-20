import { deleteDoc, doc } from "firebase/firestore";
import { auth, database, storage } from "../firebase";
import { ITodo } from "./timeline";
import { styled } from "styled-components";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 50);
    border-radius: 15px;
`;

const Column = styled.div`

`;

const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 15px;
`;

const Username = styled.span`
    font-weight: 600;
    font-size: 15px;

`;

const Payload = styled.p`
    margin: 10px 0px;
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const DeleteButton = styled.button`
    background: tomato;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
`;

export default function Todo({ username, photo, todo, userId, id }: ITodo) {
    const user = auth.currentUser;
    const onDelete = async () => {
        if (user?.uid !== userId) return;
        try {
            if (confirm("Are you sure you want to delete this post?")) {
                await deleteDoc(doc(database, "todos", id));
                if (photo) {
                    const photoRef = ref(storage, `todos/${userId}=${username}/${id}`);
                    await deleteObject(photoRef);
                }
                alert("It's deleted.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return <>
        <Wrapper>
            <Column>
                <Username>{username}</Username>
                <Payload>{todo}</Payload>
                {user?.uid === userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
            </Column>
            <Column>
                {photo ? <Photo src={photo}></Photo> : null}
            </Column>
        </Wrapper>
    </>
}