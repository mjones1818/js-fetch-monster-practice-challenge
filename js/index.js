const createMonster = document.getElementById('create-monster')
const monsterContainer = document.getElementById('monster-container')
const search = document.getElementById('search')
const forward = document.getElementById('forward')
const back = document.getElementById('back')
const URL_PREFIX = 'http://localhost:3000/'
let pageNumber = 1

forward.addEventListener('click', handleForwardClick)
back.addEventListener('click', handleBackClick)
search.addEventListener('click', handleSeach)

function createMonsterForm() {
  createMonster.innerHTML += `
    <input id="name" placeholder="name...">
    <input id="age" placeholder="age...">
    <input id="description" placeholder="description...">
    <button id="create">Create</button>
  `
  createMonster.addEventListener('click', handleCreateMonster)
}

createMonsterForm()
fetchmonsters(1)


function handleCreateMonster(e) {
  if (e.target.id == "create") {
    fetch(`${URL_PREFIX}monsters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        {
          name: document.getElementById('name').value,
          age: document.getElementById('age').value,
          description: document.getElementById('description').value
        }
      )
    })
    .then(function(resp){
      return resp.json()
    })
    .then(function(monster){
      document.getElementById('name').value = ""
      document.getElementById('age').value = ""
      document.getElementById('description').value = ""
    })
  }
}

function fetchmonsters(pageNumber) {
  fetch(`${URL_PREFIX}monsters/?_limit=50&_page=${pageNumber}`)
  .then(function(resp){
    return resp.json()
  })
  .then(function(monsters){
    console.log(monsters)
    displayMonsters(monsters)
  })
}


function displayMonsters(monsters) {
  while(monsterContainer.firstChild) {
    monsterContainer.removeChild(monsterContainer.firstChild)
  }
  monsters.forEach(function(monster){
    monsterContainer.innerHTML += `
      <div>
      <h2>${monster.name}</h2>
      <h4>${monster.age}</h4>
      <p>${monster.description}
      </div>
    `
  })
}

function handleBackClick(e) {
  pageNumber --
  fetchmonsters(pageNumber)
}

function handleForwardClick(e) {
  pageNumber ++
  fetchmonsters(pageNumber)
}

function handleSeach(e) {
  
  let searchTerm = e.target.previousElementSibling
  fetch(`${URL_PREFIX}monsters?q=${searchTerm.value}`)
  .then(function(resp){
    return resp.json()
  })
  .then(function(monsters){
    searchTerm.value = ""
    displayMonsters(monsters)
  })
}