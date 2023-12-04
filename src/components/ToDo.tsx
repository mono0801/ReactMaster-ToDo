// To Do 리스트에 저장된 To DO를 출력하는 컴포넌트
import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atoms";

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

    return (
        <li>
            <span>{text}</span>
            {/* !== "To_Do"과  <button>To Do</button>이 모두 참이여야 출력됨 */}
            {category !== Categories.To_Do && (
                // arg를 넘겨주는 이벤트 핸들러의 경우 () => Function(arg)을 써야한다
                // 속성에 name=""을 추가해서 마우스 이벤트 시 해당 버튼의 이름을 넘겨주는 방법도 있다
                <button onClick={() => onClick(Categories.To_Do)}>To Do</button>
            )}
            {category !== Categories.Doing && (
                <button onClick={() => onClick(Categories.Doing)}>Doing</button>
            )}
            {category !== Categories.Done && (
                <button onClick={() => onClick(Categories.Done)}>Done</button>
            )}
        </li>
    );
}

export default ToDo;
