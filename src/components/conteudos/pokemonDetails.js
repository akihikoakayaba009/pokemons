// src/pages/PokemonDetails.js
import React from 'react';

const PokemonDetails = ({ pokemon, onClose }) => {
  return (
    <div style={overlayStyle}>
      <div style={detailsStyle}>
        <h2 style={titleStyle}>{pokemon.name.toUpperCase()}</h2>
        <img src={pokemon.image} alt={pokemon.name} style={imageStyle} />
        <p style={textStyle}><strong>ID:</strong> {pokemon.id}</p>
        <p style={textStyle}><strong>Tipos:</strong> {pokemon.types}</p>
        <p style={textStyle}><strong>Habilidades:</strong> {pokemon.abilities}</p>
        
        <button onClick={onClose} style={closeButtonStyle}>Fechar</button>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const detailsStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '15px',
  textAlign: 'center',
  width: '300px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.3s',
};

const titleStyle = {
  margin: '10px 0',
  color: '#e94560',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '15px',
  border: '2px solid #e94560',
};

const textStyle = {
  margin: '5px 0',
  fontSize: '14px',
  color: '#333',
};

const closeButtonStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#e94560',
  color: '#ffffff',
  cursor: 'pointer',
  marginTop: '15px',
  transition: 'background-color 0.3s',
};

export default PokemonDetails;
