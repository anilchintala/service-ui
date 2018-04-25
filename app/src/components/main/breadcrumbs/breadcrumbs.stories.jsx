import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import { MemoryRouter } from 'react-router';
import { Breadcrumbs } from './breadcrumbs';

const getDescriptors = (withActive, withError, withListView) => [
  {
    title: 'All',
    path: 'http://localhost:3000/#default_project/launches/all',
  },
  {
    title: 'Launch #1',
    path: 'http://localhost:3000/#default_project/launches/all/1',
    listView: withListView,
  },
  {
    title: 'Suite #1',
    path: 'http://localhost:3000/#default_project/launches/all/1/suite/1',
    active: withActive,
    error: withError,
  },
];

storiesOf('Components/Main/Breadcrumbs', module)
  .addDecorator(
    host({
      title: 'Breadcrumbs',
      align: 'center middle',
      backdrop: 'rgba(70, 69, 71, 0.2)',
      background: '#fff',
      height: 50,
      width: 600,
    }),
  )
  .addDecorator((story) => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('default state', () => <Breadcrumbs />)
  .add('with items', () => <Breadcrumbs descriptors={getDescriptors()} />)
  .add('with active item', () => <Breadcrumbs descriptors={getDescriptors(true)} />)
  .add('with error item', () => <Breadcrumbs descriptors={getDescriptors(false, true)} />)
  .add('with list view', () => <Breadcrumbs descriptors={getDescriptors(true, false, true)} />);
