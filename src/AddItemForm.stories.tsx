import { AddItemForm } from './AddItemForm';

export default {
  title: 'AddItemForm Component',
  component: AddItemForm,
};

export const AddItemFormSb = (props: any) => {
  return (
    <AddItemForm
      addItem={(title: string) => {
        alert('lol');
      }}
    />
  );
};
