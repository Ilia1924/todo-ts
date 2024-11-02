import React from 'react';
import { action } from '@storybook/addon-actions';
import { EditableSpan } from './EditableSpan';

export default {
  title: 'EditableSpan Component',
  component: EditableSpan,
};

const changeCallback = action('changeCallback work');

export const EditableSpanComponentSb = () => {
  return <EditableSpan title="a po4emu tak?" onChange={changeCallback} />;
};
