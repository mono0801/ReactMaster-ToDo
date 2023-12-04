import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoSelector } from "./atoms";
import CategorySelctor from "./CategorySelector";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoListDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

function ToDoList() {
    // useRecoilState()은 useRecoilValue와 useSetRecoilState 2개를 동시에 사용할 때 쓴다
    const toDos = useRecoilValue(toDoSelector);

    return (
        <ToDoListDiv>
            <div>
                <h1>To Do List</h1>
                <hr />

                <CategorySelctor />
                <CreateToDo />
                <hr />

                {toDos?.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </div>
        </ToDoListDiv>
    );
}

export default ToDoList;
