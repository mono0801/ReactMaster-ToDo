import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

// export enum Categories {
//     // ["To_Do", "Doing", "Done",] 이런식으로 할경우 To_Do = 0, Doing = 1, Done = 2로 할당된다
//     "To_Do" = "To_Do",
//     "Doing" = "Doing",
//     "Done" = "Done",
// }

let Categories = ["To Do", "Doing", "Done"];

export interface IToDo {
    text: string;
    id: number;
    category: string;
}

// Recoil에 영속성(persist) 부여 - 로컬 스토리지에 저장가능
const { persistAtom } = recoilPersist();

/**
 * 현재 카테고리 변경
 */
export const categoryState = atom({
    key: "category",
    default: Categories[0],
});

/**
 * 카테고리 리스트 저장
 */
export const categoriesState = atom<string[]>({
    key: "categories",
    default: Categories,
    effects_UNSTABLE: [persistAtom],
});

/**
 * toDo 리스트 저장
 */
export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom],
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
