class Dog {
  constructor(id,name,breed,sex){
    this.id = id
    this.name = name
    this.breed = breed
    this.sex = sex
  }
  
  render() {
    return `<tr id="${this.id}"><td>${this.name}</td> <td>${this.breed}</td> <td>${this.sex}</td> <td><button onclick="editDog(${this.id} , '${this.name}' , '${this.breed}' , '${this.sex}');">Edit</button></td></tr>`
  }
}