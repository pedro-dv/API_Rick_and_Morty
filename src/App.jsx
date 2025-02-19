import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [character, setCharacter] = useState([]);
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getCharacter() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      if (!response.ok) {
        throw new Error('Erro ao buscar personagens');
      }
      const data = await response.json();
      setCharacter(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function filterCharacter() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${nome}`
      );
      if (!response.ok) {
        throw new Error('Personagem não encontrado');
      }
      const data = await response.json();
      setCharacter(data.results);
    } catch (error) {
      setError(error.message);
      setCharacter([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (nome) {
      filterCharacter();
    } else {
      getCharacter();
    }
  }, [nome]);

  return (
    <>
      <section>
        <h1>API Rick And Morty</h1>
        <input
          type="text"
          placeholder="Digite o nome do personagem"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        {loading && <p>Carregando...</p>}
        {error && <p className="no-results">{error}</p>}
        {character.length > 0 ? (
          <div className="character-list">
            {character.map((element) => (
              <div className="character-card" key={element.id}>
                <img
                  src={element.image}
                  alt={`Foto do ${element.name}`}
                />
                <h2>{element.name}</h2>
                <p>Status: <span>{element.status === "unknown" ? "não disponível" : element.status}</span></p>
                <p>Espécie: <span>{element.species === "unknown" ? "não disponível" : element.species}</span></p>
                <p>Planeta: <span>{element.origin.name === "unknown" ? " não disponível" : element.origin.name}</span></p>
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && <p className="no-results">Nenhum personagem encontrado.</p>
        )}
      </section>
    </>
  );
}

export default App;