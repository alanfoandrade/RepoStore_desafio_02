const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRepo);

  return response.send(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repoIndex >= 0) {
    repositories[repoIndex] = {
      ...repositories[repoIndex],
      title,
      url,
      techs,
    };

    return response.send(repositories[repoIndex]);
  }

  return response.status(400).send({ message: "Repository not found" });
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repoIndex >= 0) {
    repositories.splice(repoIndex, 1);

    return response.status(204).send();
  }

  return response.status(400).send({ message: "Repository not found" });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repoIndex >= 0) {
    repositories[repoIndex] = {
      ...repositories[repoIndex],
      likes: repositories[repoIndex].likes + 1,
    };

    return response.send(repositories[repoIndex]);
  }

  return response.status(400).send({ message: "Repository not found" });
});

module.exports = app;
