import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Hello } from '../src';
import { HelloProps } from '../src/components/Hello';

export default {
  component: Hello,
  title: 'Components/Hello',
} as Meta;

const Template: Story<HelloProps> = (args) => <Hello {...args} />;

export const Aracaju = Template.bind({});
Aracaju.args = { name: 'Aracaju' };

export const Brasilia = Template.bind({});
Brasilia.args = { name: 'Brasilia' };

export const Rio = Template.bind({});
Rio.args = { name: 'Rio de Janeiro' };
