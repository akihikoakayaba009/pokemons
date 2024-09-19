import React from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonImagem from './assets/pokemon.png';

// Componente Pokemon
const Pokemon = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/pokemons'); // Navegar para a página de testes
  };

  return (
    <div style={backgroundImage}>
      <h1 style={headerStyle}>Colecionar Pokemon
      </h1>
      <div style={projectCard}>
        <img style={projectImage} src={PokemonImagem} alt="Pokemon" />
      </div>
      <div style={bottom}>
        <button style={buttonStyle} onClick={handleStart}>
          Começar
        </button>
      </div>
    </div>
  );
};

// Estilos
const backgroundImage = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw', // Largura total da janela
  height: '100vh', // Altura total da janela
  backgroundColor: '#1a1a2e',
  color: '#f0f0f0',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const projectCard = {
  padding: '20px',
  border: '10px solid #ddd',
  borderRadius: '10px',
  width: '80%', // Ajusta a largura para 80% da tela
  maxWidth: '500px', // Limita a largura máxima
  backgroundColor: '#1a1a2e',
  color: '#f0f0f0',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const projectImage = {
  width: '100%',
  height: '300px',
  objectFit: 'cover',
  borderRadius: '5px',
  marginBottom: '15px',
};

const bottom = {
  padding: '10px',
  marginTop: '10px',
};

const buttonStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '30px',
  backgroundColor: '#000080',
  color: '#f0f0f0',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.3s',
};

const headerStyle = {
  marginBottom: '20px',
  color: '#e94560',
};

buttonStyle[':hover'] = {
  backgroundColor: '#e94560',
  color: '#fff',
  transform: 'scale(1.05)',
};

export default Pokemon;
