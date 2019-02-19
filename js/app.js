const main = document.querySelector('.main-content'); 
const modal = document.querySelector('.modals');

// ------------------------------------------ 
// FETCH FUNCTIONS 
// ------------------------------------------ 

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => generateEmployeeCard(data.results))

// ------------------------------------------ 
// HELPER FUNCTIONS 
// ------------------------------------------ 
function generateEmployeeCard(data) {
    for (let i = 0; i < data.length; i++){

        const name = data[i].name.first + " " + data[i].name.last;
        const email = data[i].email;
        const city = data[i].location.city;
        const img = data[i].picture.large;
        const address = data[i].location.street + " " + data[i].location.city
            + ", " + data[i].location.state + " " + data[i].location.postcode;
        const birthday = "Birthday: " + data[i].dob.date;
        console.log(data);

        const card = `
            <div class="employee">
                <img class="employee-img" src="${img}" alt="">
                <div class="employee-info">
                    <h2 class="name">${name}</h2>
                    <p class="email">${email}</p>
                    <p class="city">${city}</p>
                </div>
            </div>
        `;

        const modal = `
            <div class=".modal-content" id="emp${i}">
                <img class="employee-img" src="${img}" alt="">
                <div class="employee-info">
                    <h2 class="name">${name}</h2>
                    <p class="email">${email}</p>
                    <p class="city">${city}</p>
                    <div></div>
                </div>
            </div>
        `;

        main.innerHTML += card;
    };
    

   
}

// ------------------------------------------ 
// EVENT LISTENERS 
// ------------------------------------------ 

// ------------------------------------------ 
// POST DATA 
// ------------------------------------------ 



// Get the modal
// var modal = document.getElementById('myModal');

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
