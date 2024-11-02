import React from 'react';
import { action } from '@storybook/addon-actions';
import { Task } from './Task';

export default {
  title: 'Task Component',
  component: Task,
};

const changeTaskStatusCallback = action('changeTaskStatusCallback work');
const changeTaskTitleCallback = action('changeTaskTitle work');
const deleteTaskCallback = action('deleteTask work');

export const TaskComponentSb = () => {
  return (
    <>
      <Task
        task={{ id: '1', isDone: true, title: 'dooo' }}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        deleteTask={deleteTaskCallback}
        todolistId={'todolist1'}
      />
      <Task
        task={{ id: '2', isDone: false, title: 'ood' }}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        deleteTask={deleteTaskCallback}
        todolistId={'todolist1'}
      />
    </>
  );
};
