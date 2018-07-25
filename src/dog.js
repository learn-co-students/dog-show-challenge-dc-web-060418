let dogId = 0
let dogRoster = []
class Dog {

  constructor(name, breed, gender) {
    this.name = name
    this.breed = breed
    this.gender = gender
    this.id = ++dogId
    dogRoster.push(this)
  }

  render() {
    return `<tr>
              <td>${this.name}</td>
              <td>${this.breed}</td>
              <td>${this.gender}</td>
              <td><button>Edit Dog</button>
              </td>
            </tr>`
  }

  static findDogById(id) {
    return dogRoster.find(dog => id === dog.id)
  }

  static findDogByCharacteristics(name, breed, gender) {
    return dogRoster.find(dog => {
      return(dog.name === name && dog.breed === breed && dog.gender === gender)
    })
  }

}
