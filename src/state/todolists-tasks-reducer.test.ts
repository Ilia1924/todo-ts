import { TaskStateType, TodolistType } from "../App"
import { tasksReducer } from "./tasks-reducer"
import { addTodolistActionCreator, todolistsReducer } from "./todolists-reducer"

test('ids must be equals', () => {
    const startTaskState: TaskStateType = {};
    const startTodolistState: Array<TodolistType> = [];
    const action = addTodolistActionCreator('new list');

    const endTaskState = tasksReducer(startTaskState, action);
    const endTodolistState = todolistsReducer(startTodolistState, action);

    const keys = Object.keys(endTaskState);
    const idFormTask = keys[0];
    const idFormTodoList = endTodolistState[0].id;

    expect(idFormTask).toBe(action.todolistId);
    expect(idFormTodoList).toBe(action.todolistId);
});