// To Do를 입력받는 컴포넌트
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { categoryState, toDoState } from "./atoms";

const Wrapper = styled.div`
    width: 100%;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
`;

const Input = styled.input`
    margin-right: 5px;
`;

const ErrorText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

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
        <Wrapper>
            <form onSubmit={handleSubmit(handleValid)}>
                <InputContainer>
                    <Input
                        {...register("toDo", {
                            required: "Please write To Do",
                        })}
                        placeholder="Write a To Do"
                    />
                    <button>➕</button>
                </InputContainer>
                <ErrorText>
                    <p>{errors?.toDo?.message}</p>
                </ErrorText>
            </form>
        </Wrapper>
    );
}

export default CreateToDo;
