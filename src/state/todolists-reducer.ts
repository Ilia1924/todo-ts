import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../AppWithRedux';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  title: string;
  todolistId: string;
};

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TIILE';
  id: string;
  title: string;
};

export type ChangeFilterTodolistActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilterValuesType;
};

type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeFilterTodolistActionType;

// export let todolistId1 = v1();
// export let todolistId2 = v1();
// export let todolistId3 = v1();

const initialState: Array<TodolistType> = [
  // { id: todolistId1, title: 'Films', filter: 'all' },
  // { id: todolistId2, title: 'Portugal', filter: 'all' },
  // { id: todolistId3, title: 'England', filter: 'all' }
];

export const todolistsReducer = (
  state: Array<TodolistType> = initialState,
  action: ActionType,
): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter((task) => task.id !== action.id);
    }

    case 'ADD-TODOLIST': {
      return [
        ...state,
        {
          id: action.todolistId,
          title: action.title,
          filter: 'all',
        },
      ];
    }

    case 'CHANGE-TODOLIST-TIILE': {
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl,
      );
    }

    case 'CHANGE-TODOLIST-FILTER': {
      const newState = state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl,
      );
      return newState;
    }

    default:
      return state;
  }
};

export const removeTodolistActionCreator = (
  todolistId: string,
): RemoveTodolistActionType => {
  return {
    type: 'REMOVE-TODOLIST',
    id: todolistId,
  };
};

export const addTodolistActionCreator = (
  title: string,
): AddTodolistActionType => {
  return {
    type: 'ADD-TODOLIST',
    title,
    todolistId: v1(),
  };
};

export const changeTodolistTitleActionCreator = (
  id: string,
  title: string,
): ChangeTodolistTitleActionType => {
  return {
    type: 'CHANGE-TODOLIST-TIILE',
    id: id,
    title: title,
  };
};

export const changeFilterTodolistActionCreator = (
  filter: FilterValuesType,
  id: string,
): ChangeFilterTodolistActionType => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: filter,
    id: id,
  };
};
