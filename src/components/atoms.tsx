import { atom } from "recoil";

export interface IToDo {
    text: string;
    id: number;
    // category는 To_Do / Doing / Done 중에 1개만 가질 수 있다
    category: "To_Do" | "Doing" | "Done";
}

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});
