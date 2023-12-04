import { atom, selector } from "recoil";

export enum Categories {
    // ["To_Do", "Doing", "Done",] 이런식으로 할경우 To_Do = 0, Doing = 1, Done = 2로 할당된다
    "To_Do" = "To_Do",
    "Doing" = "Doing",
    "Done" = "Done",
}

export interface IToDo {
    text: string;
    id: number;
    // category는 To_Do / Doing / Done 중에 1개만 가질 수 있다
    category: Categories;
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.To_Do,
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

// atom()을 get으로 가져와 함수에 의해 변화된 값을 반환하는 함수
export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);

        return toDos.filter((toDo) => toDo.category === category);
    },
});
