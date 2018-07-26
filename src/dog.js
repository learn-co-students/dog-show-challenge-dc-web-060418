

// class Dog {
//   constructor(name, breed, gender){
//     this.name = name,
//     this.breed = breed,
//     this.gender = gender,
//     this.render()
//     this.addEditHandler(name, breed, gender)
//   }


  
//   render(){
//     const tableRow = document.createElement("tr")
//     buttonId++
//     tableRow.innerHTML = `<tr><td>${this.name}</td> <td>${this.breed}</td> <td>${this.gender}</td> <td><button data-id="${buttonId}">Edit Dog</button></td></tr>`
//     document.getElementById("table-body").appendChild(tableRow)
    
//   }

//   addEditHandler(name, breed, gender){
//     document.getElementById(buttonId).addEventListener("click", function(e){
//       document.getElementById("name-input").value = name
//       document.getElementById("breed-input").value = breed
//       document.getElementById("sex-input").value = gender

      
//     })
//   }
  
// }