import { useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodolistActionCreator, changeFilterTodolistActionCreator, changeTodolistTitleActionCreator, removeTodolistActionCreator, todolistsReducer } from './state/todolists-reducer';
import { ChangeTaskStatusActionCreator, ChangeTaskTitleActionCreator, addTaskActionCreator, removeTaskActionCreator, tasksReducer } from './state/tasks-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
  const tasksObj = useSelector<AppRootState, TaskStateType>(state => state.tasks)

  function deleteTask(id: string, todolistId: string) {
    const action = removeTaskActionCreator(id, todolistId);
    dispatch(action);
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskActionCreator(title, todolistId);
    dispatch(action);
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    const action = ChangeTaskTitleActionCreator(todolistId, taskId, newTitle);
    dispatch(action);
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const action = ChangeTaskStatusActionCreator(todolistId, taskId, isDone);
    dispatch(action);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeFilterTodolistActionCreator(value, todolistId)
    dispatch(action);
  }

  function removeTodoList(todolistId: string) {
    const action = removeTodolistActionCreator(todolistId);
    dispatch(action);
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const action = changeTodolistTitleActionCreator(todolistId, newTitle)
    dispatch(action);
  }

  function addTodolist(title: string) {
    const action = addTodolistActionCreator(title);
    dispatch(action);
  }

  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge="start" color='inherit' aria-label='menu'>
            <Menu />
          </IconButton>
          <Typography variant='h6'>
            CLOVO
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} key={v1()} />
        </Grid>
        <Grid container>
          {
            todolists.map(tl => {
              let tasksForTodolist = tasksObj[tl.id];
              if (tl.filter === 'completed') {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
              }
              if (tl.filter === 'active') {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
              }

              return <Grid item>
                <Paper style={{ padding: '20px', margin: "20px" }}>
                  <Todolist title={tl.title}
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
            })
          }
        </Grid>
      </Container>
    </div >
  );
}

export default AppWithRedux;
