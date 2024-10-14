import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import AddItemForm from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string,
    title: string,
    tasks: TaskType[],
    deleteTask: (id: string, todolistId: string) => void,
    changeFilter: (value: FilterValuesType, todolistId: string) => void,
    addTask: (title: string, todolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void,
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void,
    filter: FilterValuesType,
    removeTodolist: (todolistId: string) => void,
    changeTodolistTitle: (todolistId: string, newTitle: string) => void,
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id);
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id);
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon />
                </IconButton>

            </h3>
            <AddItemForm addItem={addTask} />
            {
                props.tasks.map(task => {

                    const onRemoveHandler = () => { props.deleteTask(task.id, props.id) }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(task.id, newValue, props.id)
                    }

                    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
                        <Checkbox
                            color={"success"}
                            checked={task.isDone}
                            onChange={onChangeStatusHandler}
                            icon={<BookmarkBorderIcon />}
                            checkedIcon={<BookmarkIcon />}
                        />
                        <EditableSpan title={task.title}
                            onChange={onChangeTitleHandler} />
                        <IconButton onClick={onRemoveHandler}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                })
            }

            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} className={props.filter === 'all' ? 'active-button' : ''}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}