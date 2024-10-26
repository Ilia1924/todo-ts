import { Checkbox, IconButton } from '@mui/material';
import { TaskType } from './Todolist';
import { EditableSpan } from './EditableSpan';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import React, { ChangeEvent, useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

type TaskPropsType = {
  deleteTask: (id: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string,
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newValue: string,
    todolistId: string,
  ) => void;
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo((props: TaskPropsType) => {
  const onRemoveHandler = () => {
    props.deleteTask(props.task.id, props.todolistId);
  };
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(
      props.task.id,
      e.currentTarget.checked,
      props.todolistId,
    );
  };

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },
    [props.task.id, props.changeTaskTitle, props.todolistId],
  );

  return (
    <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
      <Checkbox
        color={'success'}
        checked={props.task.isDone}
        onChange={onChangeStatusHandler}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
      />
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
      <IconButton onClick={onRemoveHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
});
