import {
    ChangeTaskStatusActionCreator,
    ChangeTaskTitleActionCreator,
    addTaskActionCreator,
    removeTaskActionCreator,
    tasksReducer
} from "./tasks-reducer";
import { TaskStateType, TodolistType } from "../App";
import { addTodolistActionCreator, removeTodolistActionCreator } from "./todolists-reducer";

let startState: TaskStateType;

beforeEach(() => {
    startState = {
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false }
        ],
        'todolistId2': [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'cafe', isDone: false }
        ],
    };
});


test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskActionCreator('2', 'todolistId2'))

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();
});

test('correct task should be added to correct array', () => {
    const endState = tasksReducer(startState, addTaskActionCreator('juice', 'todolistId2'))

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId1'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juice');
    expect(endState['todolistId2'][0].isDone).toBe(false);
});

test('status of correct task is changed', () => {
    const endState = tasksReducer(startState, ChangeTaskStatusActionCreator('todolistId2', '2', false));

    expect(endState['todolistId2'][1].isDone).toBe(false);
    expect(endState['todolistId1'][1].isDone).toBe(true);
});

test('title of correct task is changed', () => {
    const endState = tasksReducer(startState, ChangeTaskTitleActionCreator('todolistId2', '1', 'New Title'));

    expect(endState['todolistId2'][0].title).toBe('New Title');
    expect(endState['todolistId1'][1].title).toBe('JS');
});

test('new property in new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodolistActionCreator('New todolist'));

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw new Error('invalid')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, removeTodolistActionCreator('todolistId2'));
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});