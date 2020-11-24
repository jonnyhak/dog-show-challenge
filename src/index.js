document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.querySelector("#table-body")
    const dogForm = document.querySelector("#dog-form")
    

    const renderDog = (dogObj) => {
        const tr = document.createElement("tr")
        tr.className = "dog-row"
        tr.dataset.id = dogObj.id 
        
        dogTable.append(tr)

        const name = document.createElement("td")
        name.textContent = dogObj.name
        // name.id = dogObj.id
        name.className = "name"

        const breed = document.createElement("td")
        breed.textContent = dogObj.breed
        // breed.id = dogObj.id
        breed.className = "breed" 

        const sex = document.createElement("td")
        sex.textContent = dogObj.sex
        // sex.id = dogObj.id
        sex.className = "sex"
        
        const edit = document.createElement("button")
        edit.textContent = "Edit Dog"
        edit.id = dogObj.id
        
        tr.append(name, breed, sex, edit)
        const dogId = dogObj.id 
        
       
    }
       dogTable.addEventListener("click", (e) => {
           if (e.target.textContent === "Edit Dog") {
               
               const id = e.target.id 
               //   console.log(dogTable)
                 
               const row = document.querySelector(`[data-id='${id}']`)
                dogForm.name.value = row.querySelector(".name").textContent
                dogForm.breed.value = row.querySelector(".breed").textContent
                dogForm.sex.value = row.querySelector(".sex").textContent

                
                dogForm.addEventListener("submit", (e) => {
                    // console.log("submit")
                    e.preventDefault()
                    
                    // const id = dogForm.dataset.id
                    
                    // console.log(dogForm.name.value.id)
                    
                    const updatedObj = {
                        name: dogForm.name.value,
                        breed: dogForm.breed.value,
                        sex: dogForm.sex.value
                    }
                    
                    // console.log(updatedObj)
                    
                    updateDog( id, updatedObj )
                })
            }
        }) 
    
    
    const getDogs = () => {
        fetch('http://localhost:3000/dogs')
            .then(response => {
                return response.json()
            }).then((dogArray) => {
                // console.log(dogArray)
                dogArray.forEach((dogObj) => {
                    renderDog(dogObj)
                })
            })
    }

    const updateDog = (id, updatedObj) => {
        fetch(`http://localhost:3000/dogs/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: updatedObj.name,
                breed: updatedObj.breed,
                sex: updatedObj.sex
            })
        })
            .then(response => {
                return response.json()
            }).then(console.log)
    }



    getDogs()

})