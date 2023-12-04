// 카테고리를 고르는 컴포넌트
import { useRecoilState } from "recoil";
import { Categories, categoryState } from "./atoms";

function CategorySelctor() {
    const [category, setCategory] = useRecoilState(categoryState);

    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };

    return (
        <select value={category} onInput={onInput}>
            <option value={Categories.To_Do}>To Do</option>
            <option value={Categories.Doing}>Doing</option>
            <option value={Categories.Done}>Done</option>
        </select>
    );
}

export default CategorySelctor;
