// To Do 리스트에 저장된 To DO를 출력하는 컴포넌트
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, IToDo, toDoState } from "./atoms";

const Wrapper = styled.div`
    width: 100%;
`;

const TodoList = styled.ul``;

const TodoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`;

const Button = styled.button`
    margin-right: 5px;
`;

const TodoText = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
`;

function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const categories = useRecoilValue<string[]>(categoriesState); // 모든 카테고리

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
                    <TodoText>{text}</TodoText>
                    <ButtonContainer>
                        <Button onClick={deleteToDo}>❌</Button>
                        {categories.map((props) => (
                            <Button
                                key={props}
                                onClick={() => onClick(props)}
                                disabled={category === props}
                            >
                                {props}
                            </Button>
                        ))}
                    </ButtonContainer>
                </TodoContainer>
            </TodoList>
        </Wrapper>
    );
}

export default ToDo;
