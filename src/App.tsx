import { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';

export type FilterValuesType = 'all' | 'completed' | 'active';

type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodoLists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'what the matter', filter: 'all' },
    { id: todolistId2, title: 'what the mafake', filter: 'all' }
  ]);

  const [tasksObj, setTasks] = useState<TaskStateType>({
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
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(task => task.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj })
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value
      setTodoLists([...todolists])
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  let removeTodoList = (todolistId: string) => {
    let filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
    setTodoLists(filteredTodolists);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title,
    }
    setTodoLists([todolist, ...todolists])
    setTasks({
      ...tasksObj,
      [todolist.id]: [],
    })
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />

      {
        todolists.map(tl => {
          let tasksForTodolist = tasksObj[tl.id];
          if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
          }
          if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
          }

          return <Todolist title={tl.title}
            key={tl.id}
            id={tl.id}
            tasks={tasksForTodolist}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodoList} />
        })
      }
    </div>
  );
}

export default App;
