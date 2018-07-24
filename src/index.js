document.addEventListener('DOMContentLoaded', () => {
    freshPageLoad();
    document.querySelector('form').children[3].addEventListener('click', submitHandler);
})


function freshPageLoad(){
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(data => processJSON(data))
}
function processJSON(data){
    for(const dog of data){
        createNewDogFromJson(dog);
    }
}

function createNewDogFromJson(dog){
        const dogObject = new Dog(dog.id, dog.name, dog.breed, dog.gender);
        const tr = document.createElement('tr');
        tr.innerHTML = dogObject.render();
        selectDogTable().appendChild(tr);
        document.getElementById(`${dogObject.id}`).addEventListener('click', editDog)
}

function selectDogTable(){
    return document.getElementById('table-body');
}

function editDog(event){
    document.querySelector('form').children[0].value = event.target.parentElement.parentElement.children[0].dataset.name;
    document.querySelector('form').children[1].value = event.target.parentElement.parentElement.children[1].dataset.breed;
    document.querySelector('form').children[2].value = event.target.parentElement.parentElement.children[2].dataset.gender;
    document.querySelector('form').children[3].dataset.id = event.target.parentElement.parentElement.children[3].children[0].id;

}

function submitHandler(event){
    event.preventDefault();
    if(event.target.form["0"].value != '' && event.target.form["1"].value != '' && event.target.form["2"].value != ''){
    const data = {name: event.target.form["0"].value, breed: event.target.form["1"].value, gender: event.target.form["2"].value}
    if(event.target.form["3"].dataset.id != ''){
        fetch(`http://localhost:3000/dogs/${parseInt(event.target.form["3"].dataset.id)}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json; charset=utf-8"},
        body: JSON.stringify(data)} )
    .then(response => response.json())
    .then(data => { 
        const tableRowArray = document.getElementById(data.id).parentElement.parentElement.children;
        tableRowArray[0].dataset.name = data.name;
        tableRowArray[0].innerText = data.name;
        tableRowArray[1].dataset.breed = data.breed;
        tableRowArray[1].innerText = data.breed;
        tableRowArray[2].dataset.gender = data.gender;
        tableRowArray[2].innerText = data.gender;
    })
    }else{
    fetch(`http://localhost:3000/dogs/`, {
        method: "Post",
        headers: {"Content-Type": "application/json; charset=utf-8"},
        body: JSON.stringify(data)} )
    .then(response => response.json())
    .then(data => createNewDogFromJson(data));}
    event.target.form["0"].value = '';
    event.target.form["1"].value = '';
    event.target.form["2"].value = '';
    event.target.form["3"].dataset.id = '';}
}

