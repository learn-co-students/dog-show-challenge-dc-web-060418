document.addEventListener('DOMContentLoaded', () => {
  fetchAllDogs()
  document.querySelector("#dog-form").addEventListener("submit", formHandler)
})


//     H A N D L E R S     //
function formHandler(e) {
  e.preventDefault()
  let name = e.target.name.value
  let breed = e.target.breed.value
  let gender = e.target.sex.value

  let id = parseInt(document.querySelector("#dog-form").dataset.id)

  if (id) {
    let dog = Dog.findDogById(id)
    dog.name = name
    dog.breed = breed
    dog.gender = gender

    let dogElement = document.querySelector(`#dog-${id}`)
    dogElement.innerHTML = dog.render()
    patchDog(dog)
  } else {
    postNewDog(name, breed, gender)
  }
}

function editButtonHandler(e) {
  let dogId = parseInt(e.target.dataset.id)
  let dog = Dog.findDogById(dogId)
  let form = document.querySelector("#dog-form")
  form.dataset.id = dog.id

  form.name.value = dog.name
  form.breed.value = dog.breed
  form.sex.value = dog.gender
}

//     F E T C H E R S     //
function fetchAllDogs() {
  fetch(`http://localhost:3000/dogs`)
  .then(response => response.json())
  .then(jsonData => {
    jsonData.forEach(dog => {
      addNewDogToDom(dog)
    })
  })
}

function postNewDog(name, breed, gender) {
  let data = {name: name, breed: breed, gender: gender}
  fetch('http://localhost:3000/dogs', {
    method: "POST",
    headers: {"Content-Type": "application/json; charset=utf-8"},
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(dog => {
    addNewDogToDom(dog)
  })
}

function patchDog(dogObject) {
  fetch(`http://localhost:3000/dogs/${dogObject.id}`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json; charset=utf-8"},
    body: JSON.stringify(dogObject)
  })
}

//     H E L P E R S     //
function addNewDogToDom(dog) {
  let newDog = new Dog(dog.name, dog.breed, dog.gender)
  let tr = document.createElement("tr")
  tr.innerHTML = newDog.render()
  tr.id = `dog-${dog.id}`
  let tableBody = document.querySelector("#table-body")
  tableBody.appendChild(tr)
  let button = tr.querySelector("button")
  button.addEventListener("click", editButtonHandler)
  button.dataset.id = newDog.id
}
