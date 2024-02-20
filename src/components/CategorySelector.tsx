// 카테고리를 고르는 컴포넌트
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { Categories, categoriesState, categoryState, toDoState } from "./atoms";

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
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
`;

const SelectDiv = styled.div`
    background-color: whitesmoke;
    border-radius: 7px;
    padding: 5px;
    color: black;
    width: 60%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;

const Button = styled.button``;

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

    const [category, setCategory] = useRecoilState(categoryState); // 현재 선택한 카테고리
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
            console.log(categories);
        }
        // submit하고 input을 빈칸으로 세팅
        setValue("category", "");
    };

    const onClick = (category: string) => {
        setCategory(category);
    };

    const deleteCategory = () => {
        if (window.confirm("삭제 하시겠습니까?")) {
            setCategories((oldCategory) => {
                const newCategory = oldCategory.filter(
                    (current) => current !== category
                );
                setCategory(categories[0]);
                return newCategory;
            });
        } else {
            return null;
        }
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
                {Categories.map((category) => (
                    <Container>
                        <SelectDiv
                            key={category}
                            onClick={() => onClick(category)}
                        >
                            {category}
                            <Button
                                onClick={deleteCategory}
                                disabled={
                                    category === Categories[0] ||
                                    category === Categories[1] ||
                                    category === Categories[2]
                                }
                            >
                                ❌
                            </Button>
                        </SelectDiv>
                    </Container>
                ))}
            </SelectContainer>
        </Wrapper>
    );
}

export default CategorySelctor;
