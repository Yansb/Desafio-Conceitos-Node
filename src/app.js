const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {id: uuid(), title, techs, likes: 0, url};

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repositoryIndex < 0){
    return response.status(400).json({error: "Repository not found!"});
  }

  const {likes} = repositories[repositoryIndex]

  const repository= {
    id,
    title,
    techs,
    likes,
    url,
  };
  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoriesIndex = repositories.findIndex(repository=> repository.id === id);

  if(repositoriesIndex < 0){
    return response.status(400).json({error: "Repository not found!"});
  }

  repositories.splice(repositoriesIndex,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json({error: "Repository not found!"});
  }
  
  const {url, techs, title} = repositories[repositoryIndex];
  let {likes} = repositories[repositoryIndex];

  likes = likes + 1;
  
  const repository= {
    id,
    title,
    techs,
    likes,
    url,
  };
  repositories[repositoryIndex] = repository;

  return response.json(repository);


});

module.exports = app;
