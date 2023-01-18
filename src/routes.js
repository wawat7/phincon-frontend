import React from 'react';

// components
const Pokemon = React.lazy(() => import('./views/Pokemon'));

const routes = [
  {
    name: 'root',
    path: '/',
    element: <Pokemon/>
  },
];

export default routes;
