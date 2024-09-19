import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Pokemon from './components/home';
import Testes from './components/conteudos/teste';
import Header from './components/header/header';
import PokemonList from './components/conteudos/PokemonList';
import Cart from './components/conteudos/cartpokemon';

const App = () => {
  return (
    <div>
        <Header />
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/testes" element={<Testes />} />
        <Route path="/pokemons" element={<PokemonList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
