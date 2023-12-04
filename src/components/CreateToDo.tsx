// To Do를 입력받는 컴포넌트
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IForm>();

    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [
            ...oldToDos,
            // [text, id, category] 추가
            { text: toDo, id: Date.now(), category },
        ]);
        // submit하고 input을 빈칸으로 세팅
        setValue("toDo", "");
    };

    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input
                {...register("toDo", {
                    required: "Please write To Do",
                })}
                placeholder="Write a To Do"
            />
            <button>Add</button>
            <p>{errors?.toDo?.message}</p>
        </form>
    );
}

export default CreateToDo;
