import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
    toDo: string;
}

function ToDoList() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IForm>();

    const handleValid = (data: IForm) => {
        console.log("add : ", data.toDo);
        // submit하고 input을 빈칸으로 세팅
        setValue("toDo", "");
    };

    return (
        <div>
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
        </div>
    );
}

export default ToDoList;
