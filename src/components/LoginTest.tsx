// Recoil을 공부하기위한 Login Test Page
import React, { useState } from "react";
import { useForm } from "react-hook-form";

/* function LoginTest() {
    const [todo, setToDo] = useState("");
    const [error, setError] = useState("");

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setToDo(value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(todo);
        setError("");
        if (todo.length < 10) {
            return setError("너무 짧습니다");
        }
        console.log("submit");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    value={todo}
                    placeholder="Write a To Do"
                />
                <button>Add</button>
                {error !== "" ? error : null}
            </form>
        </div>
    );
} */

interface IForm {
    // require이 아닌 부분이 있을 경우 ?를 붙여야 한다 => Email? : string
    Email: string;
    FirstName: string;
    LastName: string;
    passWord1: string;
    passWord2: string;
    extraError?: string;
}

function LoginTest() {
    // register함수를 사용하면 onChange 이벤트 핸들러를 사용할 필요가 없다
    // watch => form의 입력 값의 변화를 관찰
    // handleSubmit => onSubmit, event.preventDefault() 대체
    // onBlur 이벤트 핸들러 => 포커스가 input창을 벗어날 때 실행
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IForm>({
        defaultValues: {
            Email: "i@naver.com",
            FirstName: "Kim",
            LastName: "Unknown",
            passWord1: "",
            passWord2: "",
        },
    });
    const onValid = (data: IForm) => {
        console.log(data);
        if (data.passWord1 !== data.passWord2) {
            setError(
                "passWord2",
                { message: "패스워드가 다릅니다" },
                { shouldFocus: true }
            );
        }
        // 이런식으로 모든 상황에서 오류 발생 시 메시지 출력이 가능하다
        // setError("extraError", { message: "Some Error occur" });
    };
    console.log(errors);

    return (
        <div>
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleSubmit(onValid)}
            >
                <span>{errors?.extraError?.message}</span>
                {/* html 태그에 required 속성을 넣지 않는 이유 : 브라우저에서 해당 속성을 지울 수 있기 때문 */}
                <input
                    {...register("Email", {
                        required: "Email Is Required",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "~ @naver.com",
                        },
                    })}
                    placeholder="Email"
                />
                <input
                    {...register("FirstName", {
                        required: true,
                        minLength: {
                            value: 2,
                            message: "First Name is too short",
                        },
                        validate: {
                            noNico: (value) =>
                                value.includes("nico")
                                    ? "'nico' 문자열을 포함하지 마십시오"
                                    : true,
                            noNick: (value) =>
                                value.includes("nick")
                                    ? "'nick' 문자열을 포함하지 마십시오"
                                    : true,
                        },
                    })}
                    placeholder="First Name"
                />
                <input
                    {...register("LastName", { required: true, maxLength: 8 })}
                    placeholder="Last Name"
                />
                <input
                    {...register("passWord1", {
                        required: true,
                        minLength: {
                            value: 2,
                            message: "PassWord is too short",
                        },
                    })}
                    placeholder="Pass Word"
                />
                <input
                    {...register("passWord2", {
                        required: true,
                        minLength: {
                            value: 2,
                            message: "PassWord is too short",
                        },
                    })}
                    placeholder="Re : Pass Word"
                />

                <button>Add</button>
                <span>{errors?.Email?.message}</span>
                <span>{errors?.FirstName?.message}</span>
                <span>{errors?.LastName?.message as string}</span>
                <span>{errors?.passWord1?.message}</span>
                <span>{errors?.passWord2?.message}</span>
            </form>
        </div>
    );
}

export default LoginTest;
