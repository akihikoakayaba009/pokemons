// src/pages/Cart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = ({ onRemove }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('https://66ec9bd62b6cf2b89c5ee5cc.mockapi.io/api');
        setCartItems(response.data);
      } catch (error) {
        console.error('Erro ao buscar itens do carrinho:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://66ec9bd62b6cf2b89c5ee5cc.mockapi.io/api/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
      onRemove(id);
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={cartContainerStyle}>
      <h1 style={headerStyle}>Carrinho de Pokémon</h1>
      {cartItems.length === 0 ? (
        <p style={emptyMessageStyle}>Seu carrinho está vazio!</p>
      ) : (
        <ul style={listStyle}>
          {cartItems.map((pokemon) => (
            <li key={pokemon.id} style={listItemStyle}>
              <img src={pokemon.image} alt={pokemon.name} style={imageStyle} />
              <h2 style={pokemonNameStyle}>{pokemon.name}</h2>
              <p><strong>ID:</strong> {pokemon.id}</p>
              <p><strong>Tipos:</strong> {pokemon.types}</p>
              <p><strong>Habilidades:</strong> {pokemon.abilities}</p>
              <button onClick={() => handleRemove(pokemon.id)} style={removeButtonStyle}>
                Remover do Carrinho
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Estilos
const cartContainerStyle = {
  padding: '20px',
  backgroundColor: '#f0f0f0',
  minHeight: '100vh',
};

const headerStyle = {
  marginBottom: '20px',
  color: '#e94560',
};

const emptyMessageStyle = {
  textAlign: 'center',
  color: '#777',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

const listItemStyle = {
  backgroundColor: '#1a1a2e',
  color: '#f0f0f0',
  margin: '10px',
  borderRadius: '10px',
  padding: '10px',
  textAlign: 'center',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
};

const imageStyle = {
  width: '100px',
  height: 'auto',
  borderRadius: '10px',
};

const pokemonNameStyle = {
  margin: '10px 0',
  fontWeight: 'bold',
  textTransform: 'capitalize',
};

const removeButtonStyle = {
  padding: '5px 10px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#e94560',
  color: '#ffffff',
  cursor: 'pointer',
  marginTop: '10px',
};

export default Cart;
