import { useState } from "react";
import styled from "styled-components"
import { auth, database, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
`;

const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &::placeholder {
        font-size: 16px;
    }
    &:focus {
        outline: none;
        border-color: #1d9bf0;
    }
    &::-webkit-scrollbar {
        width: 0;
    }
`;

const AttachFileButton = styled.label`
    padding: 10px 0;
    color: #1d9bf0;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #1d9bf0;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;

const AttachFileInput = styled.input`
    display: none;
`;

const SubmitButton = styled.input`
    padding: 10px 0px;
    color: white;
    background: #1d9bf0;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active {
        opacity: 0.8;
    }
`;

const MB = 1 * 1024 * 1024;

export default function PostTodoForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [todo, setTodo] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTodo(e.target.value);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e?.target;
        if (files && files.length === 1) {
            if (files[0].size > MB * 50) {
                alert("Photo size is too big!");
            } else {
                setFile(files[0]);
            }
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || todo === "" || todo.length > 300) return;
        try {
            setIsLoading(true);
            const document = await addDoc(collection(database, "todos"), {
                todo,
                createdAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid,
            });
            if (file) {
                const locationRef = ref(storage, `todos/${user.uid}=${user.displayName}/${document.id}`);
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(document, {
                    photo: url
                });
            }
            setTodo("");
            setFile(null);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return <>
        <Form onSubmit={onSubmit}>
            <TextArea rows={5} maxLength={300} value={todo} placeholder="What's your task?" onChange={onTextChange} />
            <AttachFileButton htmlFor="file">{file ? "Photo added ✔️" : "Add Photo"}</AttachFileButton>
            <AttachFileInput id="file" name="file" type="file" accept="immage/*" onChange={onFileChange} />
            <SubmitButton type="submit" value={isLoading ? "Loading..." : "Post ToDo"} />
        </Form>
    </>
}