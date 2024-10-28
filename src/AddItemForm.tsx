import { IconButton, TextField } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false); // добавляем состояние для отслеживания попытки добавления

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
    if (isTouched && error) {
      // Убираем ошибку, если пользователь начал ввод после первой попытки добавления
      setError(null);
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  const addItem = () => {
    setIsTouched(true); // Устанавливаем флаг, что была попытка добавления
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle('');
      setError(null); // Убираем ошибку при успешном добавлении
      setIsTouched(false); // Сбрасываем флаг
    } else {
      setError('TITLE IS REQUIRED');
    }
  };

  return (
    <div>
      <TextField
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressHandler}
        variant="outlined"
        label="Type value"
        error={isTouched && !!error} // показываем ошибку только после первой попытки
        helperText={isTouched && error ? 'Field is required' : ''}
      />
      <IconButton onClick={addItem} color="success">
        <AddTaskIcon />
      </IconButton>
    </div>
  );
});
