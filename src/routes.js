import React from 'react';

// components
const Pokemon = React.lazy(() => import('./views/Pokemon'));
const MyListPokemon = React.lazy(() => import('./views/MyListPokemon'));
const DetailPokemon = React.lazy(() => import('./views/Pokemon/detail'));

const routes = [
  {
    name: 'root',
    path: '/',
    element: <Pokemon/>
  },
  {
    name: 'root',
    path: '/my-list-pokemon',
    element: <MyListPokemon/>
  },
  {
    name: 'root',
    path: '/detail/:id',
    element: <DetailPokemon/>
  },

];

export default routes;
