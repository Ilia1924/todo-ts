import { v1 } from 'uuid';
import { TaskStateType } from '../App';
// import { AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2, todolistId3 } from './todolists-reducer'
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from './todolists-reducer';

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  id: string;
  taskId: string;
};

export type addTaskActionType = {
  type: 'ADD-TASK';
  todolistId: string;
  title: string;
};

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-STATUS-TASK';
  todolistId: string;
  taskId: string;
  isDone: boolean;
};

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TITLE-TASK';
  todolistId: string;
  taskId: string;
  title: string;
};

type ActionsType =
  | RemoveTaskActionType
  | addTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TaskStateType = {
  // [todolistId1]: [
  //     { id: v1(), title: "Ziga-Zaga", isDone: true },
  //     { id: v1(), title: "FightClub", isDone: true },
  //     { id: v1(), title: "I.D.", isDone: false },
  //     { id: v1(), title: "Firm", isDone: false },
  // ],
  // [todolistId2]: [
  //     { id: v1(), title: "Sporting", isDone: false },
  //     { id: v1(), title: "Benfica", isDone: false },
  //     { id: v1(), title: "Porto", isDone: true },
  //     { id: v1(), title: "Braga", isDone: false },
  // ],
  // [todolistId3]: [
  //     { id: v1(), title: "Liverpool", isDone: false },
  //     { id: v1(), title: "Arsenal", isDone: true },
  //     { id: v1(), title: "MU", isDone: true },
  //     { id: v1(), title: "MC", isDone: true },
  //     { id: v1(), title: "Fulham", isDone: true },
  // ]
};

export const tasksReducer = (
  state: TaskStateType = initialState,
  action: ActionsType,
): TaskStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = { ...state };
      const tasks = state[action.id];
      const filteredtasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.id] = filteredtasks;
      return stateCopy;
    }

    case 'ADD-TASK': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTasks = [
        { id: v1(), title: action.title, isDone: false },
        ...tasks,
      ];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }

    case 'CHANGE-STATUS-TASK': {
      const todolistsTasks = state[action.todolistId];
      const updatedTasks = todolistsTasks.map((t) =>
        t.id === action.taskId ? { ...t, isDone: action.isDone } : t,
      );

      return {
        ...state,
        [action.todolistId]: updatedTasks,
      };
    }

    case 'CHANGE-TITLE-TASK': {
      const todolistsTasks = state[action.todolistId];
      const updatedTasks = todolistsTasks.map((t) =>
        t.id === action.taskId ? { ...t, title: action.title } : t,
      );

      return {
        ...state,
        [action.todolistId]: updatedTasks,
      };
    }

    case 'ADD-TODOLIST': {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [];
      return stateCopy;
    }

    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    default:
      return state;
  }
};

export const removeTaskActionCreator = (
  taskId: string,
  todolistId: string,
): RemoveTaskActionType => {
  return {
    type: 'REMOVE-TASK',
    id: todolistId,
    taskId: taskId,
  };
};

export const addTaskActionCreator = (
  title: string,
  todolistId: string,
): addTaskActionType => {
  return {
    type: 'ADD-TASK',
    title: title,
    todolistId: todolistId,
  };
};

export const ChangeTaskStatusActionCreator = (
  todolistId: string,
  taskId: string,
  isDone: boolean,
): ChangeTaskStatusActionType => {
  return {
    type: 'CHANGE-STATUS-TASK',
    todolistId: todolistId,
    taskId: taskId,
    isDone: isDone,
  };
};

export const ChangeTaskTitleActionCreator = (
  todolistId: string,
  taskId: string,
  title: string,
): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE-TITLE-TASK',
    todolistId: todolistId,
    taskId: taskId,
    title: title,
  };
};
