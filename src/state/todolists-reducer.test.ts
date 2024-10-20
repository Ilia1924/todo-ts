import {
    addTodolistActionCreator,
    changeFilterTodolistActionCreator,
    changeTodolistTitleActionCreator,
    removeTodolistActionCreator,
    todolistsReducer
} from "./todolists-reducer";
import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

let todolistId1: string;
let todolistId2: string;
let todolistId3: string;

let startState: Array<TodolistType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    todolistId3 = v1();

    startState = [
        { id: todolistId1, title: 'Films', filter: 'all' },
        { id: todolistId2, title: 'Portugal', filter: 'all' },
        { id: todolistId3, title: 'England', filter: 'all' }
    ];
});

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistActionCreator(todolistId1));

    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const newTodolistTitle = "new list";
    const endState = todolistsReducer(startState, addTodolistActionCreator(newTodolistTitle));

    expect(endState.length).toBe(4);
    expect(endState[3].title).toBe(newTodolistTitle);
    expect(endState[3].filter).toBe('all');
});

test('correct todolist should change its name', () => {
    const newTodolistTitle = "new todo list";
    const endState = todolistsReducer(startState, changeTodolistTitleActionCreator(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe('Films');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct todolist filter should be changed', () => {
    const newFilter: FilterValuesType = "completed";
    const endState = todolistsReducer(startState, changeFilterTodolistActionCreator(newFilter, todolistId3));

    expect(endState[1].filter).toBe('all');
    expect(endState[2].filter).toBe(newFilter);
});
