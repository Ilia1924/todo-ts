import { combineReducers, createStore } from 'redux';
import { todolistsReducer } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});
export const store = createStore(rootReducer);

// @ts-expect-error зачем?
window.store = store;
