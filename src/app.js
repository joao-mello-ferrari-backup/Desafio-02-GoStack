const express = require("express");
const cors = require("cors");

const {v4: uuid} = require('uuid')

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body 
  const newRepository = {id: uuid(), title, url, techs, likes:0}

  repositories.push(newRepository)
  
  return response.json(newRepository)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {title, url, techs} = request.body

  const repositoryToEditIndex = repositories.findIndex(repository=>repository.id === id)

  if(repositoryToEditIndex < 0){
    return response.status(400).json({error: 'Provided id is not valid'})
  }

  const likes = repositories[repositoryToEditIndex].likes
  const updatedRepository = {id, title, url, techs, likes}

  repositories.push(updatedRepository)

  return response.json(updatedRepository)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const repositoryToDeleteIndex = repositories.findIndex(repository=>repository.id === id)

  if(repositoryToDeleteIndex < 0){
    return response.status(400).json({error: 'Provided id is not valid'})
  }

  repositories.splice(repositoryToDeleteIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repositoryToEditIndex = repositories.findIndex(repository=>repository.id === id)

  if(repositoryToEditIndex < 0){
    return response.status(400).json({error: 'Provided id is not valid'})
  }

  const likes = repositories[repositoryToEditIndex].likes

  repositories[repositoryToEditIndex].likes = likes + 1

  return response.json({likes: likes+1})
});

module.exports = app;
