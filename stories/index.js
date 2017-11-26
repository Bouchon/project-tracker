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

const projects = [
  { name: 'Project name', author: 'Florian Knoblauch', description: 'Project description' },
  { name: 'Long project name miam this is good', author: 'Admin', description: 'Project description' },
  { name: 'Project name', author: 'Admin', description: 'Project description very long. Project description very long. Project description very long.' }
]

storiesOf('Project', module)
.add('simple', () => (
  <div>
    <Project project={ projects[0] } />
    <Project project={ projects[1] } />
    <Project project={ projects[2] } />
  </div>
))