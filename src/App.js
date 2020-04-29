import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const loadRepos = async () => {
      const { data } = await api.get("repositories");

      setRepositories(data);
    };

    loadRepos();
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post("repositories", {
      title: "Projeto com Node",
      url: "http://github.com/projetoComNode",
      techs: ["Node.js"],
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories([...repositories.filter((item) => item.id !== id)]);
    } catch (error) {
      console.error(`Erro ao deletar o repositório, erro... ${error}`);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }, idx) => (
          <li key={idx}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
