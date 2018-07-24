function getAllDogs() {

    fetch("http://localhost:3000/dogs")
    .then(data => data.json())
    .then(jsonObj => {makeNewDogElements(jsonObj)})
}

function makeNewDogElements(jsonObj) {
    document.getElementById("table-body").innerHTML = ""
    jsonObj.forEach(dog => {
        makeANewDogElement(dog)
    })
}

function makeANewDogElement(dog) {
    let myDog = new Dog(dog.id, dog.name, dog.breed, dog.gender)
    let dogDOM = document.createElement("tr")
    document.getElementById("table-body").appendChild(dogDOM)
    dogDOM.outerHTML = myDog.renderDog()
    myDog.addEditButton()
}

function handleSubmit(e) {
    e.preventDefault()
    let newName = e.target.name.value
    let newBreed = e.target.breed.value
    let newSex = e.target.sex.value
    let dogObj = {name: newName, breed: newBreed, gender: newSex}
    
    addNewDogToDatabaseAndPage(dogObj)
    //^sends post request to json obj
    //gets the dog json object
    //makes A NewDogElement
    e.target.reset()
}

function addNewDogToDatabaseAndPage(dogObj) {
    //console.log(dogObj)
    fetch("http://localhost:3000/dogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(dogObj)
    }).then(response => response.json())
    .then(json => makeANewDogElement(json))
}

function removeEditForm() {
    document.getElementById("edit-form").remove()
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("connected")
    document.getElementById("dog-form").addEventListener("submit", handleSubmit)
    getAllDogs()

})