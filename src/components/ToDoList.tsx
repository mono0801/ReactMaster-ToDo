import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoListDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

function ToDoList() {
    // useRecoilState()은 useRecoilValue와 useSetRecoilState 2개를 동시에 사용할 때 쓴다
    const toDos = useRecoilValue(toDoState);
    console.log(toDos);
    return (
        <ToDoListDiv>
            <div>
                <h1>To Do List</h1>
                <hr />
                <CreateToDo />
                <ul>
                    {toDos.map((toDo) => (
                        // {...toDo} == text={toDo.text} category={toDo.category} id={toDo.id}
                        <ToDo key={toDo.id} {...toDo} />
                    ))}
                </ul>
            </div>
        </ToDoListDiv>
    );
}

export default ToDoList;