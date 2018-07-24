class Dog {
  constructor(id, name, breed, sex) {
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.sex = sex;
  }
  render() {
    return `<tr><td>*Name*</td> <td>*Breed*</td> <td>*Sex*</td> <td><button>Edit</button></td></tr>`
  }
  renderDog() {
    return `<tr><td>${this.name}</td> <td>${this.breed}</td> <td>${this.sex}</td> <td><button id="${this.id}">Edit</button></td></tr>` 
  }

  addEditButton() {
    let btn = document.getElementById(this.id)
    btn.addEventListener("click", (e) => {
        console.log("You've clicked", this.name)
        this.makeEditFormAppear()
    })
  }

  makeEditFormAppear() {
    let editForm = document.createElement("form")
    editForm.id = "edit-form"
    editForm.innerHTML = `<input type="name" name="name" placeholder="name" value="${this.name}">
    <input type="breed" name="breed" placeholder="breed" value="${this.breed}">
    <input type="sex" name="sex" placeholder="sex" value="${this.sex}">
    <input type="submit" value="Submit">`
    document.querySelector("#dog-forms").appendChild(editForm)
    editForm.addEventListener("submit", (e) => {
      e.preventDefault()
      let newName = e.target.name.value
      let newBreed = e.target.breed.value
      let newSex = e.target.sex.value
      let dogObj = {name: newName, breed: newBreed, gender: newSex}
      this.handleEdit(dogObj)
      e.target.reset()
    })

  }

  handleEdit(dogObj) {
    //let dogObj = {name: this.name, breed: this.breed, gender: this.sex}
    fetch(`http://localhost:3000/dogs/${this.id}`, {
      method: "PATCH",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(dogObj)
    }).then(resp => resp.json())
    .then(json => console.log("I got back",json))
    removeEditForm()
    getAllDogs()
  }

  
}