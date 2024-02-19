// 카테고리를 고르는 컴포넌트
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { Categories, categoryState, toDoState } from "./atoms";

const Wrapper = styled.div`
    margin-left: 5px;
    width: 100%;
    height: 100%;
`;

const Title = styled.h1`
    font-size: 200%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
`;

const ErrorText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface IForm {
    toDo: string;
}

function CategorySelctor() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IForm>();

    const [category, setCategory] = useRecoilState(categoryState);
    const setToDos = useSetRecoilState(toDoState);

    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [
            ...oldToDos,
            // [text, id, category] 추가
            { text: toDo, id: Date.now(), category },
        ]);
        // submit하고 input을 빈칸으로 세팅
        setValue("toDo", "");
    };

    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };

    return (
        <Wrapper>
            <Title>Category</Title>
            <hr />
            <form onSubmit={handleSubmit(handleValid)}>
                <InputContainer>
                    <input
                        {...register("toDo", {
                            required: "Please write Category",
                        })}
                        placeholder="Write a Category"
                    />
                    <button>Add</button>
                </InputContainer>
                <ErrorText>
                    <p>{errors?.toDo?.message}</p>
                </ErrorText>
            </form>
            <hr />
            <select value={category} onInput={onInput}>
                <option value={Categories.To_Do}>To Do</option>
                <option value={Categories.Doing}>Doing</option>
                <option value={Categories.Done}>Done</option>
            </select>
        </Wrapper>
    );
}

export default CategorySelctor;
