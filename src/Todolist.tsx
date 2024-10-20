import React, { useCallback } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from "./Task"

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string,
    title: string,
    tasks: TaskType[],
    changeFilter: (value: FilterValuesType, todolistId: string) => void,
    addTask: (title: string, todolistId: string) => void,
    deleteTask: (id: string, todolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void,
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void,
    filter: FilterValuesType,
    removeTodolist: (todolistId: string) => void,
    changeTodolistTitle: (todolistId: string, newTitle: string) => void,
}

export const Todolist = React.memo(function (props: PropsType) {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id]);

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle]);

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id);
    }, [props.changeFilter, props.id]);

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id);
    }, [props.changeFilter, props.id]);

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id);
    }, [props.changeFilter, props.id]);

    let tasksForTodolist = props.tasks;

    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
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
                props.tasks?.map(task => <Task
                    task={task}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    deleteTask={props.deleteTask}
                    todolistId={props.id}
                    key={task.id}
                />)
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
})