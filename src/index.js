

document.addEventListener('DOMContentLoaded', () => {
    fetchAllDogs()
    submitDogHandler(document.getElementById("dog-form"))
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
    let button = document.getElementById(`${dog.id}-button`)
    editDogHandler(button)
    
    

}

function editDogHandler(node) {
    node.addEventListener("click", function(e){
        e.preventDefault()
        const id = parseInt(node.id)
        const name = document.getElementById(`name-${id}`)
        const breed = document.getElementById(`breed-${id}`)
        const gender = document.getElementById(`gender-${id}`)
        document.getElementById(`name-input`).value = name.innerText
        document.getElementById(`breed-input`).value = breed.innerText
        document.getElementById("sex-input").value = gender.innerText
        const submit = document.getElementById("submit-input")
        submit.dataset.id = id
    })
}

function submitDogHandler(node) {
    node.addEventListener("submit", function(e){
        e.preventDefault()
        let id = e.target.submit.dataset.id
        let data = {
            id: parseInt(id),
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
            console.log(data)
            reRender(data)
            document.getElementById("dog-form").reset()
            const submit = document.getElementById("submit-input")
        submit.dataset.id = ""
        })

    

    }) 
}

function reRender(data){
    let tr = document.getElementById(data.id)
    tr.innerHTML = `<tr><td id="name-${data.id}">${data.name}</td> <td id="breed-${data.id}">${data.breed}</td> <td id="gender-${data.id}">${data.gender}</td> <td><button id="${data.id}-button">Edit Dog</button></td></tr>`
    let button = document.getElementById(`${data.id}-button`)
    editDogHandler(button)
}


