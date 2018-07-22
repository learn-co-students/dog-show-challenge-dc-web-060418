document.addEventListener('DOMContentLoded', function() {
  // When I call fetchAllDogs() here, nothing happens.

});

fetchAllDogs()

function fetchAllDogs() {
  fetch(`http://localhost:3000/dogs`).then((response) => response.json()).then((jsonData) => {
    jsonData.forEach((dog) => render(dog))
  })
}

function editDog(event) {
  let dogName = document.querySelector(`#name-${event.target.id}`)
  let dogBreed = document.querySelector(`#breed-${event.target.id}`)
  let dogSex = document.querySelector(`#sex-${event.target.id}`)
  document.querySelector("#name").value = `${dogName.innerText}`
  document.querySelector("#breed").value = `${dogBreed.innerText}`
  document.querySelector("#sex").value = `${dogSex.innerText}`
  document.querySelector("#submit").dataset.id = `${event.target.id}`

  document.querySelector("#submit").addEventListener("click", function(event) {
    event.preventDefault()
    console.log("called postDog")
    let dogName = document.querySelector("#name").value
    let dogBreed = document.querySelector("#breed").value
    let dogSex = document.querySelector("#sex").value
    let id = document.querySelector("#submit").dataset.id
    postDog(dogName, dogBreed, dogSex, id)
  })
}

function postDog(dogName, dogBreed, dogSex, id) {
  let data = {
    "name": dogName,
    "breed": dogBreed,
    "sex": dogSex
  }
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(dog => {
    //do something
    console.log(dog)
    document.querySelector("#dog-form").reset()
  })
}

function getTable() {
  return document.querySelector("#table-body");
}

function render(dog) {
  let newDogRow = document.createElement("tr");
  newDogRow.id = dog.id;
  newDogRow.innerHTML += `<td id="name-${dog.id}">${dog.name}</td>
  <td id="breed-${dog.id}">${dog.breed}</td>
  <td id="sex-${dog.id}">${dog.gender}</td>`
  let editLink = document.createElement("td")
  editLink.innerHTML = `<td><a href="#" id=${dog.id}>Edit Dog</a></td>`

  editLink.addEventListener("click", function(event) {
    event.preventDefault
    editDog(event)
  })

  newDogRow.appendChild(editLink)
  getTable().appendChild(newDogRow)

}
