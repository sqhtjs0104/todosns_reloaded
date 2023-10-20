import { useEffect, useState } from "react";

import { styled } from "styled-components";

import { database } from "../firebase";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import Todo from "./todo";
import { Unsubscribe } from "firebase/auth";

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-flow: column nowrap;
`;

export interface ITodo {
    id: string,
    photo?: string,
    todo: string,
    userId: string,
    username: string,
    createdAt: number;
}

export default function Timeline() {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        let unsubscribes: Unsubscribe | null = null;
        (async () => {
            const todosQuery = query(
                collection(database, "todos"),
                orderBy("createdAt", "desc"),
                limit(25)
            );

            unsubscribes = await onSnapshot(todosQuery, (snapshot) => {
                const todos = snapshot.docs.map((doc) => {
                    const { todo, createdAt, userId, username, photo } = doc.data();
                    return {
                        todo,
                        createdAt,
                        userId,
                        username,
                        photo,
                        id: doc.id,
                    };
                });
                setTodos(todos);
            });
        })();

        return () => {
            unsubscribes && unsubscribes();
        }
    }, []);

    return <>
        <Wrapper>
            {todos.map(todo => <Todo key={todo.id} {...todo} />)}
        </Wrapper>
    </>
}