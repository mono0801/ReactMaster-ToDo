// 카테고리를 고르는 컴포넌트
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { categoriesState, categoryState } from "./atoms";

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

const Input = styled.input`
    margin-right: 5px;
`;

const ErrorText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SelectContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
`;

const SelectDiv = styled.div`
    background-color: whitesmoke;
    border-radius: 10px;
    padding: 7px;
    color: black;
    font-weight: bolder;
    width: 50%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        border: 2px solid #9c88ff;
        color: royalblue;
    }
`;

interface IForm {
    category: string;
}

function CategorySelctor() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IForm>();

    const setCategory = useSetRecoilState(categoryState); // 현재 선택한 카테고리
    const [categories, setCategories] =
        useRecoilState<string[]>(categoriesState); // 모든 카테고리

    const handleValid = ({ category }: IForm) => {
        if (categories.includes(category)) {
            alert("같은 이름의 카테고리는 추가할 수 없습니다.");
            return;
        } else {
            setCategories((oldCategory) => [
                ...oldCategory,
                // category 추가
                category,
            ]);
            alert("카테고리가 추가되었습니다.");
        }
        // submit하고 input을 빈칸으로 세팅
        setValue("category", "");
    };

    const onClick = (category: string) => {
        setCategory(category);
    };

    return (
        <Wrapper>
            <Title>Category</Title>
            <hr />
            <form onSubmit={handleSubmit(handleValid)}>
                <InputContainer>
                    <Input
                        {...register("category", {
                            required: "Please write Category",
                        })}
                        placeholder="Write a Category"
                    />
                    <button>➕</button>
                </InputContainer>
                <ErrorText>
                    <p>{errors?.category?.message}</p>
                </ErrorText>
            </form>
            <hr />

            <SelectContainer>
                {categories?.map((category) => (
                    <Container key={category}>
                        <SelectDiv
                            key={category}
                            onClick={() => onClick(category)}
                        >
                            {category}
                        </SelectDiv>
                    </Container>
                ))}
            </SelectContainer>
        </Wrapper>
    );
}

export default CategorySelctor;
