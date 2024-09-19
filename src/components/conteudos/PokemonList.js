import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonDetails from './pokemonDetails'; // Importa o componente de detalhes

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para Pokémon selecionado

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const detailResponse = await axios.get(pokemon.url);
            return {
              name: detailResponse.data.name,
              image: detailResponse.data.sprites.front_default,
              id: detailResponse.data.id,
              types: detailResponse.data.types.map(type => type.type.name).join(', '),
              abilities: detailResponse.data.abilities.map(ability => ability.ability.name).join(', '),
            };
          })
        );
        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails); // Inicializa a lista filtrada
      } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const addToCart = async (pokemon) => {
    const pokemonWithImage = {
      name: pokemon.name,
      image: pokemon.image, // Inclui a URL da imagem
      id: pokemon.id,
      types: pokemon.types,
      abilities: pokemon.abilities,
    };

    try {
      await axios.post('https://66ec9bd62b6cf2b89c5ee5cc.mockapi.io/api', pokemonWithImage);
      alert(`${pokemon.name} adicionado ao carrinho!`);
    } catch (error) {
      console.error('Erro ao salvar Pokémon:', error);
      if (error.response) {
        alert(`Erro ${error.response.status}: ${error.response.data.message || 'Erro ao adicionar Pokémon.'}`);
      } else {
        alert('Erro ao adicionar Pokémon.');
      }
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(term)
    );
    setFilteredPokemons(filtered);
  };

  const handleViewDetails = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Lista de Pokémon</h1>
      <input
        type="text"
        placeholder="Pesquisar Pokémon..."
        value={searchTerm}
        onChange={handleSearch}
        style={searchInputStyle}
      />
      <ul style={listStyle}>
        {filteredPokemons.map((pokemon) => (
          <li key={pokemon.id} style={listItemStyle}>
            <img src={pokemon.image} alt={pokemon.name} style={imageStyle} />
            <h2 style={pokemonNameStyle}>{pokemon.name}</h2>
            <p>ID: {pokemon.id}</p>
            <p><strong>Tipos:</strong> {pokemon.types}</p>
            <p><strong>Habilidades:</strong> {pokemon.abilities}</p>
            <button style={viewButtonStyle} onClick={() => handleViewDetails(pokemon)}>
              Ver Mais
            </button>
            <button style={cartButtonStyle} onClick={() => addToCart(pokemon)}>
              Adicionar ao Carrinho
            </button>
          </li>
        ))}
      </ul>
      {selectedPokemon && (
        <PokemonDetails 
          pokemon={selectedPokemon} 
          onClose={handleCloseDetails} 
        />
      )}
    </div>
  );
};

// Estilos
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  backgroundColor: '#f0f0f0',
  minHeight: '100vh',
};

const headerStyle = {
  marginBottom: '20px',
  color: '#e94560',
};

const searchInputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginBottom: '20px',
  width: '300px',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const listItemStyle = {
  backgroundColor: '#1a1a2e',
  color: '#f0f0f0',
  margin: '10px',
  borderRadius: '10px',
  width: '220px',
  textAlign: 'center',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s',
  padding: '10px',
  position: 'relative',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
};

const pokemonNameStyle = {
  margin: '10px 0',
  fontWeight: 'bold',
  textTransform: 'capitalize',
};

const cartButtonStyle = {
  padding: '5px 10px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#000080',
  color: '#ffffff',
  cursor: 'pointer',
  marginTop: '10px',
  transition: 'background-color 0.3s',
};

const viewButtonStyle = {
  padding: '5px 10px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: '#ffffff',
  cursor: 'pointer',
  marginTop: '10px',
  transition: 'background-color 0.3s',
};

export default PokemonList;
