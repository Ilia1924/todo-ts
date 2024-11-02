import { AddItemForm } from './AddItemForm';
import React from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'AddItemForm Component',
  component: AddItemForm,
};

const cbStoriesAction = action("button 'add' was pressed inside the form");

export const AddItemFormSb = (props: any) => {
  return <AddItemForm addItem={cbStoriesAction} />;
};
