// import { addTodolistActionCreator, changeFilterTodolistActionCreator, ChangeFilterTodolistActionType, changeTodolistTitleActionCreator, removeTodolistActionCreator, todolistsReducer } from "./todolists-reducer";
// import { v1 } from "uuid";
// import { FilterValuesType, TodolistType } from "../App";

// test('correct todolist should be removed', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();

//     const startState: Array<TodolistType> = [
//         { id: todolistId1, title: 'what the matter', filter: 'all' },
//         { id: todolistId2, title: 'what the mafake', filter: 'all' }
//     ];
//     const endState = todolistsReducer(startState, removeTodolistActionCreator(todolistId1));

//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todolistId2);
// });

// test('correct todolist should be added', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();

//     const newTodolistTitle = "new list";

//     const startState: Array<TodolistType> = [
//         { id: todolistId1, title: 'what the matter', filter: 'all' },
//         { id: todolistId2, title: 'what the mafake', filter: 'all' }
//     ];
//     const endState = todolistsReducer(startState, addTodolistActionCreator(newTodolistTitle));

//     expect(endState.length).toBe(3);
//     expect(endState[2].title).toBe(newTodolistTitle);
//     expect(endState[2].filter).toBe('all');
// });

// test('correct todolist should change his name', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();

//     const newTodolistTitle = "new todo list";

//     const startState: Array<TodolistType> = [
//         { id: todolistId1, title: 'what the matter', filter: 'all' },
//         { id: todolistId2, title: 'what the mafake', filter: 'all' }
//     ];

//     const endState = todolistsReducer(startState, changeTodolistTitleActionCreator(newTodolistTitle, todolistId2));

//     expect(endState[0].title).toBe('what the matter');
//     expect(endState[1].title).toBe(newTodolistTitle);
// });

// test('correct todolist should be changed', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();

//     const newFilter: FilterValuesType = "completed";

//     const startState: Array<TodolistType> = [
//         { id: todolistId1, title: 'what the matter', filter: 'all' },
//         { id: todolistId2, title: 'what the mafake', filter: 'all' }
//     ];

//     const endState = todolistsReducer(startState, changeFilterTodolistActionCreator(newFilter, todolistId2));

//     expect(endState[0].filter).toBe('all');
//     expect(endState[1].filter).toBe(newFilter);
// });



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

let startState: Array<TodolistType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    
    startState = [
        { id: todolistId1, title: 'what the matter', filter: 'all' },
        { id: todolistId2, title: 'what the mafake', filter: 'all' }
    ];
});

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistActionCreator(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const newTodolistTitle = "new list";
    const endState = todolistsReducer(startState, addTodolistActionCreator(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct todolist should change its name', () => {
    const newTodolistTitle = "new todo list";
    const endState = todolistsReducer(startState, changeTodolistTitleActionCreator(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe('what the matter');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct todolist filter should be changed', () => {
    const newFilter: FilterValuesType = "completed";
    const endState = todolistsReducer(startState, changeFilterTodolistActionCreator(newFilter, todolistId2));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
