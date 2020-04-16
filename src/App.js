import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const linkBackEnd =
    "https://github.com/BrenoMaia98/GoStack-desafio02-ConceitosNode";
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    api
      .post("repositories", {
        url: "https://github.com/BrenoMaia98",
        title: `Desafio conceitos React.js - ${Date.now()}`,
        techs: ["Node.js", "React.js"],
      })
      .then((newRepo) => {
        setRepositories([...repositories, newRepo.data]);
      });
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`repositories/${id}`)
      .then((response) => {
        if (response.status === 204) {
          const repositoryIndex = repositories.findIndex(
            (repo) => repo.id === id
          );
          if (repositoryIndex < 0) alert("Repositório não encontrado");
          else {
            let newArray = [...repositories];
            newArray.splice(repositoryIndex, 1);
            console.log({ newArray, repositoryIndex });
            setRepositories(newArray);
          }
        }
      })
      .catch((e) => alert("Erro com a requisição"));
  }

  return (
    <div className="page">
      <div>
        <div className="TextBox">
          <h1 align="center">Conceitos básicos de React.js</h1>
          <h3 align="center">
            com integração com back-end ({" "}
            <a href={linkBackEnd} rel="noopener noreferrer" target="_blank">
              Repositório
            </a>{" "}
            )
          </h3>
        </div>
        <div className="container">
          <ul data-testid="repository-list">
            {repositories.map((repo) => {
              return (
                <li key={repo.id}>
                  {repo.title.split(" - ")[0]}
                  <button onClick={() => handleRemoveRepository(repo.id)}>
                    Remover
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="AddBtnAlign">
            <button onClick={handleAddRepository}>Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
