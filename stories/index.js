import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import Project from '../src/components/Project/Project'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

const project_simple = { name: 'Project name', description: 'Project description' }
const project_longName = { name: 'Long project name miam', description: 'Project description' }
const project_longDescription = { name: 'Project name', description: 'Project description very long. Project description very long. Project description very long.' }
storiesOf('Project', module)
  .add('item', () => (
    <div>
      <Project project={ project_simple } />
      <Project project={ project_longName } />
      <Project project={ project_longDescription } />
    </div>
  ))