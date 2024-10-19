import { useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodolistActionCreator, changeFilterTodolistActionCreator, changeTodolistTitleActionCreator, removeTodolistActionCreator, todolistsReducer } from './state/todolists-reducer';
import { ChangeTaskStatusActionCreator, ChangeTaskTitleActionCreator, addTaskActionCreator, removeTaskActionCreator, tasksReducer } from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedusers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispactInTodoListReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: 'what the matter', filter: 'all' },
    { id: todolistId2, title: 'what the mafake', filter: 'all' }
  ]);

  const [tasksObj, dispatchInTaskReduser] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "Ziga-Zaga", isDone: true },
      { id: v1(), title: "FightClub", isDone: true },
      { id: v1(), title: "I.D.", isDone: false },
      { id: v1(), title: "Firm", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Sporting", isDone: false },
      { id: v1(), title: "Benfica", isDone: true },
    ]
  });

  function deleteTask(id: string, todolistId: string) {
    const action = removeTaskActionCreator(id, todolistId);
    dispatchInTaskReduser(action);
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskActionCreator(title, todolistId);
    dispatchInTaskReduser(action);
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    const action = ChangeTaskTitleActionCreator(taskId, newTitle, todolistId);
    dispatchInTaskReduser(action);
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const action = ChangeTaskStatusActionCreator(taskId, isDone, todolistId);
    dispatchInTaskReduser(action);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeFilterTodolistActionCreator(value, todolistId)
    dispactInTodoListReducer(action);
  }

  function removeTodoList(todolistId: string) {
    const action = removeTodolistActionCreator(todolistId);
    dispactInTodoListReducer(action);
    dispatchInTaskReduser(action);

  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const action = changeTodolistTitleActionCreator(todolistId, newTitle)
    dispactInTodoListReducer(action);
  }

  function addTodolist(title: string) {
    const action = addTodolistActionCreator(title);
    dispatchInTaskReduser(action);
    dispactInTodoListReducer(action);
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

export default AppWithRedusers;
