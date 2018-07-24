class Dog {
  constructor(id, name, breed, gender){
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.gender = gender;
  }
  render() {
    return `<td data-name="${this.name}">${this.name}</td> <td data-breed="${this.breed}">${this.breed}</td> <td data-gender="${this.gender}">${this.gender}</td> <td><button id="${this.id}">Edit</button></td>`
  }
}