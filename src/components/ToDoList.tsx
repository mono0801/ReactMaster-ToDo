import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoSelector } from "./atoms";
import CategorySelctor from "./CategorySelector";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 5px;
    padding-top: 10px;
    gap: 5px;
`;

const ToDoListDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 200%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ToDoList() {
    // useRecoilState()은 useRecoilValue와 useSetRecoilState 2개를 동시에 사용할 때 쓴다
    const toDos = useRecoilValue(toDoSelector);
    const category = useRecoilValue(categoryState);

    return (
        <Wrapper>
            <CategorySelctor />
            <ToDoListDiv>
                <div>
                    <Title>{category} List</Title>
                    <hr />

                    <CreateToDo />
                    <hr />

                    {toDos?.map((toDo) => (
                        <ToDo key={toDo.id} {...toDo} />
                    ))}
                </div>
            </ToDoListDiv>
        </Wrapper>
    );
}

export default ToDoList;
