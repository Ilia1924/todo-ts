import { todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'what the matter', filter: 'all' },
        { id: todolistId2, title: 'what the mafake', filter: 'all' }
    ];
    const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1 });

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTodolistTitle = "new list";

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'what the matter', filter: 'all' },
        { id: todolistId2, title: 'what the mafake', filter: 'all' }
    ];
    const endState = todolistsReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle });

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct todolist should change his name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTodolistTitle = "new todo list";

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'what the matter', filter: 'all' },
        { id: todolistId2, title: 'what the mafake', filter: 'all' }
    ];

    const action = {
        type: 'CHANGE-TODOLIST-TIILE',
        id: todolistId2,
        title: newTodolistTitle,
    }

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe('what the matter');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'what the matter', filter: 'all' },
        { id: todolistId2, title: 'what the mafake', filter: 'all' }
    ];

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});