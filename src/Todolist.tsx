import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import AddItemForm from "./AddItemForm";


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
    filter: FilterValuesType,
    removeTodolist: (todolistId: string) => void,
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

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolist}>XXX</button></h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map(task => {

                        const onRemoveHandler = () => { props.deleteTask(task.id, props.id) }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        }

                        return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler} />
                            <span>{task.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    }
                    )
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-button' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-button' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-button' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}