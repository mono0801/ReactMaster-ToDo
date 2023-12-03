// To Do를 입력받는 컴포넌트
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IForm>();

    const handleValid = ({ toDo }: IForm) => {
        console.log("add : ", toDo);
        setToDos((oldToDos) => [
            ...oldToDos,
            { text: toDo, id: Date.now(), category: "To_Do" },
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
            <span>{errors?.toDo?.message}</span>
        </form>
    );
}

export default CreateToDo;
