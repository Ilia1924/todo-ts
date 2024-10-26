import { useReducer } from 'react';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import {
  addTodolistActionCreator,
  changeFilterTodolistActionCreator,
  changeTodolistTitleActionCreator,
  removeTodolistActionCreator,
  todolistsReducer,
} from './state/todolists-reducer';
import {
  ChangeTaskStatusActionCreator,
  ChangeTaskTitleActionCreator,
  addTaskActionCreator,
  removeTaskActionCreator,
  tasksReducer,
} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedusers() {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const todolistId3 = v1();

  const [todolists, dispactInTodoListReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: 'Films', filter: 'all' },
    { id: todolistId2, title: 'Portugal', filter: 'all' },
    { id: todolistId3, title: 'England', filter: 'all' },
  ]);

  const [tasksObj, dispatchInTaskReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: 'Ziga-Zaga', isDone: true },
      { id: v1(), title: 'FightClub', isDone: true },
      { id: v1(), title: 'I.D.', isDone: false },
      { id: v1(), title: 'Firm', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Sporting', isDone: false },
      { id: v1(), title: 'Benfica', isDone: false },
      { id: v1(), title: 'Porto', isDone: true },
      { id: v1(), title: 'Braga', isDone: false },
    ],
    [todolistId3]: [
      { id: v1(), title: 'Liverpool', isDone: false },
      { id: v1(), title: 'Arsenal', isDone: true },
      { id: v1(), title: 'MU', isDone: true },
      { id: v1(), title: 'MC', isDone: true },
      { id: v1(), title: 'Fulham', isDone: true },
    ],
  });

  function deleteTask(id: string, todolistId: string) {
    const action = removeTaskActionCreator(id, todolistId);
    dispatchInTaskReducer(action);
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskActionCreator(title, todolistId);
    dispatchInTaskReducer(action);
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string,
  ) {
    const action = ChangeTaskTitleActionCreator(todolistId, taskId, newTitle);
    dispatchInTaskReducer(action);
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const action = ChangeTaskStatusActionCreator(todolistId, taskId, isDone);
    dispatchInTaskReducer(action);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeFilterTodolistActionCreator(value, todolistId);
    dispactInTodoListReducer(action);
  }

  function removeTodoList(todolistId: string) {
    const action = removeTodolistActionCreator(todolistId);
    dispactInTodoListReducer(action);
    dispatchInTaskReducer(action);
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const action = changeTodolistTitleActionCreator(todolistId, newTitle);
    dispactInTodoListReducer(action);
  }

  function addTodolist(title: string) {
    const action = addTodolistActionCreator(title);
    dispatchInTaskReducer(action);
    dispactInTodoListReducer(action);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">CLOVO</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} key={v1()} />
        </Grid>
        <Grid container>
          {todolists.map((tl) => {
            let tasksForTodolist = tasksObj[tl.id];
            if (tl.filter === 'completed') {
              tasksForTodolist = tasksForTodolist.filter(
                (t) => t.isDone === true,
              );
            }
            if (tl.filter === 'active') {
              tasksForTodolist = tasksForTodolist.filter(
                (t) => t.isDone === false,
              );
            }

            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: '20px', margin: '20px' }}>
                  <Todolist
                    title={tl.title}
                    key={tl.id}
                    id={tl.id}
                    tasks={tasksForTodolist}
                    deleteTask={deleteTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodoList}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedusers;
