import { useCallback } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodolistActionCreator, changeFilterTodolistActionCreator, changeTodolistTitleActionCreator, removeTodolistActionCreator } from './state/todolists-reducer';
import { ChangeTaskStatusActionCreator, ChangeTaskTitleActionCreator, addTaskActionCreator, removeTaskActionCreator } from './state/tasks-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { v1 } from 'uuid';

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

  const deleteTask = useCallback((id: string, todolistId: string) => {
    const action = removeTaskActionCreator(id, todolistId);
    dispatch(action);
  }, [dispatch]);

  const addTask = useCallback((title: string, todolistId: string) => {
    const action = addTaskActionCreator(title, todolistId);
    dispatch(action);
  }, [dispatch]);

  const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
    const action = ChangeTaskTitleActionCreator(todolistId, taskId, newTitle);
    dispatch(action);
  }, [dispatch]);

  const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
    const action = ChangeTaskStatusActionCreator(todolistId, taskId, isDone);
    dispatch(action);
  }, [dispatch]);

  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    const action = changeFilterTodolistActionCreator(value, todolistId)
    dispatch(action);
  }, [dispatch]);

  const removeTodoList = useCallback((todolistId: string) => {
    const action = removeTodolistActionCreator(todolistId);
    dispatch(action);
  }, [dispatch]);

  const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
    const action = changeTodolistTitleActionCreator(todolistId, newTitle)
    dispatch(action);
  }, [dispatch]);

  const addTodolist = useCallback((title: string) => {
    const action = addTodolistActionCreator(title);
    dispatch(action);
  }, [dispatch]);

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
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container>
          {
            todolists?.map(tl => {
              let allTodoListTasks = tasksObj[tl.id]
              let tasksForTodolist = allTodoListTasks;

              if (tl.filter === "active") {
                tasksForTodolist = allTodoListTasks.filter(t => !t.isDone);
              } else if (tl.filter === "completed") {
                tasksForTodolist = allTodoListTasks.filter(t => t.isDone);
              }

              return <Grid item key={tl.id}>
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