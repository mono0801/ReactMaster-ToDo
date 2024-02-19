// To Do 리스트에 저장된 To DO를 출력하는 컴포넌트
import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "./atoms";

const Wrapper = styled.div`
    width: 100%;
`;

const TodoList = styled.ul``;

const TodoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    margin-right: 5px;
`;

const TodoText = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`;

function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);

    // ToDo의 category를 변경하는 이벤트 핸들러
    /* 클릭한 해당 버튼의 이름을 받아 category를 변경하는 이벤트 핸들러
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: {name},
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            
            const newToDo = { text, id, category: name as any };
            return [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex + 1),
            ];
        });
    } */
    // 이벤트에 인자를 받아 변경
    const onClick = (newCategory: IToDo["category"]) => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, id, category: newCategory };

            return [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex + 1),
            ];
        });
    };

    const deleteToDo = () => {
        if (window.confirm("삭제 하시겠습니까?")) {
            setToDos((oldToDos) => {
                const newToDos = oldToDos.filter((todo) => todo.id !== id);
                return newToDos;
            });
        } else {
            return null;
        }
    };

    return (
        <Wrapper>
            <TodoList>
                <TodoContainer>
                    <ButtonContainer>
                        <Button onClick={deleteToDo}>❌</Button>
                    </ButtonContainer>
                    <TodoText>{text}</TodoText>
                    <ButtonContainer>
                        {/* !== "To_Do"과  <Button>To Do</Button>이 모두 참이여야 출력됨 */}
                        {category !== Categories.To_Do && (
                            // arg를 넘겨주는 이벤트 핸들러의 경우 () => Function(arg)을 써야한다
                            // 속성에 name=""을 추가해서 마우스 이벤트 시 해당 버튼의 이름을 넘겨주는 방법도 있다
                            <Button onClick={() => onClick(Categories.To_Do)}>
                                To Do
                            </Button>
                        )}
                        {category !== Categories.Doing && (
                            <Button onClick={() => onClick(Categories.Doing)}>
                                Doing
                            </Button>
                        )}
                        {category !== Categories.Done && (
                            <Button onClick={() => onClick(Categories.Done)}>
                                Done
                            </Button>
                        )}
                    </ButtonContainer>
                </TodoContainer>
            </TodoList>
        </Wrapper>
    );
}

export default ToDo;
