import { useState } from 'react';
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

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const todolistId3 = v1();

  const [todolists, setTodoLists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'Films', filter: 'all' },
    { id: todolistId2, title: 'Portugal', filter: 'all' },
    { id: todolistId3, title: 'England', filter: 'all' },
  ]);

  const [tasksObj, setTasks] = useState<TaskStateType>({
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
    const tasks = tasksObj[todolistId];
    const filteredTasks = tasks.filter((task) => task.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const newTask = { id: v1(), title: title, isDone: false };
    const newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string,
  ) {
    const tasks = tasksObj[todolistId];
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodoLists([...todolists]);
    }
  }

  function removeTodoList(todolistId: string) {
    const filteredTodolists = todolists.filter((tl) => tl.id !== todolistId);
    setTodoLists(filteredTodolists);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodoLists([...todolists]);
    }
  }

  function addTodolist(title: string) {
    const todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title,
    };
    setTodoLists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: [],
    });
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

export default App;
