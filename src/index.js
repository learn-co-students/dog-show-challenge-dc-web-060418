document.addEventListener('DOMContentLoaded', () => {
  fetchAllDogs()
  setCreateFormListener()
})


function fetchAllDogs() {
    fetch('http://localhost:3000/dogs')
    .then((response)=>response.json())
    .then((dogData)=>{
        let dogArray = dogData.map((el)=>new Dog(el.id,el.name,el.breed,el.gender))
        renderDogs(dogArray)
    })
}

function getTableElement() {
    return document.querySelector('#table-body')
}

function renderDogs(dogArray) {
    let table = getTableElement()
    dogArray.forEach((dog)=>{
        table.innerHTML+=dog.render()
    })
}

function editDog(id, name, breed, sex) {
    const nameInput = document.getElementById('name-input')
    const breedInput = document.getElementById('breed-input')
    const sexInput = document.getElementById('sex-input')
    nameInput.value = name
    breedInput.value = breed 
    sexInput.value = sex 
    setEditFormListener(id)

}

function setEditFormListener(id) {
    document.getElementById('dog-form').removeEventListener('submit', createSubmit)
    document.getElementById('dog-form').addEventListener('submit', editSubmit.bind(id))

}

function setCreateFormListener() {
    
    document.getElementById('dog-form').addEventListener('submit', createSubmit)
}

function addDog(dog) {
    let table = getTableElement()
    table.innerHTML += dog.render()
}

function updateDog(dog) {
    updatedDog = document.createElement("tr")
    updatedDog.id = dog.id
    updatedDog.innerHTML=`<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button onclick="editDog(${dog.id} , '${dog.name}' , '${dog.breed}' , '${dog.sex}');">Edit</button></td>`
    document.getElementById('table-body').replaceChild(updatedDog,document.getElementById(dog.id))
}


function createSubmit(e) {
    const nameInput = document.getElementById('name-input')
    const breedInput = document.getElementById('breed-input')
    const sexInput = document.getElementById('sex-input')
    e.preventDefault()
    data = {
        name: nameInput.value,
        breed: breedInput.value,
        gender: sexInput.value
    }
    fetch('http://localhost:3000/dogs', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((dogData) => {
            addDog(new Dog(dogData.id, dogData.name, dogData.breed, dogData.gender))
            nameInput.value = ""
            breedInput.value = ""
            sexInput.value = ""
        })
}

function editSubmit(e) {
    const form = document.getElementById('dog-form')
    const nameInput = document.getElementById('name-input')
    const breedInput = document.getElementById('breed-input')
    const sexInput = document.getElementById('sex-input')
    e.preventDefault()
    data = {
        name: nameInput.value,
        breed: breedInput.value,
        gender: sexInput.value
    }
    fetch(`http://localhost:3000/dogs/${this}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((dogData) => {
            updateDog(new Dog(dogData.id, dogData.name, dogData.breed, dogData.gender))
            nameInput.value = ""
            breedInput.value = ""
            sexInput.value = ""
            document.getElementById('form-container').replaceChild(form.cloneNode(true),form)
            document.getElementById('dog-form').addEventListener('submit', createSubmit)
        })
}