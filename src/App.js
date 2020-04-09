import React, { useState, useEffect } from 'react';

import './styles.css';

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const { data } = await api.get('/repositories');
      setRepositories(data);
    }

    getRepositories();
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post('repositories');
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const filteredRepositories = repositories.filter(
      (repository) => id !== repository.id
    );

    setRepositories(filteredRepositories);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repository, index) => (
          <li key={index}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
