const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4")

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


// ----------------------------------------------------- //
app.get("/repositories", (request, response) => {
  //return response.json(results)
  const { title } = request.query

  const results = title
    ? repositories.filter(repository => repository.title.includes(title))
    : repositories;

  return response.json(results)
});
// ----------------------------------------------------- //
app.post("/repositories", (request, response) => { //DONE
  const { title, url, techs } = request.body
 
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)

  return response.json(repository)
});
// ----------------------------------------------------- //
app.put("/repositories/:id", (request, response) => { //DONE
  const { id } = request.params
  const { title, url, techs} = request.body

  const repositoryIndex = repositories.findIndex(repository =>
    repository.id === id);
    
  if ( repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository does not exist'})
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  }

  repositories[repositoryIndex] = repository

  return response.json(repository)
});
// ----------------------------------------------------- //
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository =>
     repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Project not found'})
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
});

// DELET- Correção do Diego
/*app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const findRepositoryIndex = repositories.findIndex(repository =>
     repository.id === id
     );

  if (findRepositoryIndex >= 0) {
    repositories.splice(findRepositoryIndex, 1);
  } else {
    return response.status(400).json({ error: 'Repository does not exists'});
  }

  return response.status(204).send()
});*/


// -------------------------
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository =>
    repository.id === id
    );

  if ( repositoryIndex === -1 ) {
    return response.status(400).json({ error: 'Repository does not exists.'});
  }

  repositories[repositoryIndex].likes += 1;

  return response.json(repositories[repositoryIndex]);

});  
 
/*
app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if ( repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found'})
  }

  
  const result = repositoryIndex

  console.log(repositoryIndex)

  repositories[repositoryIndex].likes += 1

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  }

  repositories[repositoryIndex] = repository

  return response.json()
});*/

module.exports = app;