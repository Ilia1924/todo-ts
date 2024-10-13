import { ChangeEvent, KeyboardEvent, useState } from "react"

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export default function AddItemForm(props: AddItemFormPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError('TITLE IS REQuERED')
        }
    }

    return (
        <div>
            <input value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''} />
            <button onClick={addTask}>+</button>

            {error && <div className="error-message">Field is reqiered</div>}
        </div>)
}