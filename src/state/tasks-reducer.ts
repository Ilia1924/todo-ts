import { v1 } from "uuid";
import { TaskStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer'

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    id: string,
    taskId: string,
}

export type addTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string,
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS-TASK',
    todolistId: string,
    taskId: string,
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE-TASK',
    todolistId: string,
    taskId: string,
    title: string
}

type ActionsType = RemoveTaskActionType | addTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType;

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = { ...state };
            const tasks = state[action.id];
            const filteredtasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.id] = filteredtasks;
            return stateCopy;
        }

        case 'ADD-TASK': {
            let stateCopy = { ...state };
            let tasks = stateCopy[action.todolistId];
            let newTasks = [{ id: v1(), title: action.title, isDone: false }, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }

        case 'CHANGE-STATUS-TASK': {
            let stateCopy = { ...state };
            let tasks = stateCopy[action.todolistId];
            let task = tasks?.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
        }

        case 'CHANGE-TITLE-TASK': {
            let stateCopy = { ...state };
            let tasks = stateCopy[action.todolistId];
            let task = tasks?.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title;
            }
            return stateCopy;
        }

        case 'ADD-TODOLIST': {
            let stateCopy = { ...state };
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }

        case 'REMOVE-TODOLIST': {
            let stateCopy = { ...state };
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            throw new Error("what the type?");
    }
};

export const removeTaskActionCreator = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        id: todolistId,
        taskId: taskId,
    }
};

export const addTaskActionCreator = (title: string, todolistId: string): addTaskActionType => {
    return {
        type: 'ADD-TASK',
        title: title,
        todolistId: todolistId,
    }
};

export const ChangeTaskStatusActionCreator = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-STATUS-TASK',
        todolistId: todolistId,
        taskId: taskId,
        isDone: isDone
    }
};

export const ChangeTaskTitleActionCreator = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TITLE-TASK',
        todolistId: todolistId,
        taskId: taskId,
        title: title
    }
};