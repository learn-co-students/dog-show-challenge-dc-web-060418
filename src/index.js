

document.addEventListener('DOMContentLoaded', () => {
    fetchAllDogs()
})

function fetchAllDogs(){
    fetch(`http://localhost:3000/dogs`)
    .then(res => res.json())
    .then(data => {
        data.forEach(dog => {
           render(dog)
        })
    })
}

function render(dog){
    const tableRow = document.createElement("tr")
    tableRow.id = dog.id
    tableRow.innerHTML = `<tr><td id="name-${dog.id}">${dog.name}</td> <td id="breed-${dog.id}">${dog.breed}</td> <td id="gender-${dog.id}">${dog.gender}</td> <td><button id="${dog.id}-button">Edit Dog</button></td></tr>`
    document.getElementById("table-body").appendChild(tableRow)
    let button = tableRow.querySelector("button")
    editDogHandler(button, dog.name, dog.breed, dog.gender)
    
    

}

function editDogHandler(node, name, breed, gender) {
    node.addEventListener("click", function(e){
        document.getElementById("name-input").value = name
        document.getElementById("breed-input").value = breed
        document.getElementById("sex-input").value = gender
        const form = document.getElementById("dog-form")
        const id = parseInt(node.id)
        submitDogHandler(form, id)
    })
}

function submitDogHandler(node, id) {
    node.addEventListener("submit", function(e){
        e.preventDefault()
        let tr = document.getElementById(id)
        let data = {
            id: id,
            name: e.target.name.value,
            breed: e.target.breed.value,
            gender: e.target.sex.value
        }
        fetch(`http://localhost:3000/dogs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            reRender(data)
            document.getElementById("dog-form").reset()
        })

    

    }) 
}

function reRender(data){
    let tr = document.getElementById(data.id)
    tr.innerHTML = `<tr><td id="name-${data.id}">${data.name}</td> <td id="breed-${data.id}">${data.breed}</td> <td id="gender-${data.id}">${data.gender}</td> <td><button id="${data.id}-button">Edit Dog</button></td></tr>`
}


