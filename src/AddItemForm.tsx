import { IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import AddTaskIcon from '@mui/icons-material/AddTask';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13 && newTaskTitle !== "") {
            addItem();
        }
    }

    const addItem = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError('TITLE IS REQuERED')
        }
    }

    return (
        <div>
            <TextField value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                variant={'outlined'}
                label={'Type value'}
                // className={error ? 'error' : ''} 
                error={!!error}
                helperText={error && <div className="error-message">Field is reqiered</div>}
            />
            <IconButton onClick={addItem} color={'success'}>
                <AddTaskIcon></AddTaskIcon>
            </IconButton>
        </div>)
});