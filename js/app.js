const main = document.querySelector('.main-content'); 
const modals = document.querySelector('.modals');
const modalContent = document.querySelectorAll('.modal-content');

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
    console.log(data);

    for (let i = 0; i < data.length; i++){

        const name = data[i].name.first + " " + data[i].name.last;
        const email = data[i].email;
        const city = data[i].location.city;
        const img = data[i].picture.large;
        const address = data[i].location.street + " " + data[i].location.city
            + ", " + data[i].location.state + " " + data[i].location.postcode;
        const birthday = "Birthday: " + data[i].dob.date;

        // const card = `
        //     <div class="employee">
        //         <img class="employee-img" src="${img}" alt="">
        //         <div class="employee-info">
        //             <h2 class="name">${name}</h2>
        //             <p class="email">${email}</p>
        //             <p class="city">${city}</p>
        //         </div>
        //     </div>
        // `;

        const card = document.createElement('div');
        card.classList = 'employee';
        const htmlCard = `
            <img class="employee-img" src="${img}" alt="">
            <div class="employee-info">
                <h2 class="name">${name}</h2>
                <p class="email">${email}</p>
                <p class="city">${city}</p>
            </div>
        `;
        card.innerHTML = htmlCard;
        main.appendChild(card);

        // const modal = `
        //     <div class="modal-content" id="emp${i}">
        //         <img class="employee-img" src="${img}" alt="">
        //         <div class="employee-info">
        //             <h2 class="name">${name}</h2>
        //             <p class="email">${email}</p>
        //             <p class="city">${city}</p>
        //             <div></div>
        //         </div>
        //     </div>
        // `;


        const modal = document.createElement('div');
        modal.classList = 'modal-content';
        modal.id = `emp${i}`;
        const htmlModal = `
            <img class="employee-img" src="${img}" alt="">
            <div class="employee-info">
                <h2 class="name">${name}</h2>
                <p class="email">${email}</p>
                <p class="city">${city}</p>
                <div></div>
            </div>
        `;
        modal.innerHTML = htmlModal;
        modals.appendChild(modal);
        

        // main.insertAdjacentHTML("afterbegin", card);
        // modals.insertAdjacentHTML("afterbegin", modal);
        // let index = $('.employee').index(this);

        $('.employee').click(function(){
            let index = $('.employee').index(this);
            $('.modals').fadeIn();
            $(`#emp${index}`).fadeIn();
        })


        // $( `#emp${index}` ).click(function() {
        //     console.log("hi");
        //     for (let i = 0; i < employee.length; i++) {
        //         console.log(employee.length);
        //         if (event.target === employee[i]) {
        //             const empID = `#emp${i}`
        //             const emp = document.querySelector(empID);
        //             console.log(empID, "empID");
        //             modals.style.display = "block";
        //             emp.style.display = "block";
        //             $('.modal-content').hide();
        //         }
        //     }
        // });

    };
}

// ------------------------------------------ 
// EVENT LISTENERS 
// ------------------------------------------ 

// ------------------------------------------ 
// POST DATA 
// ------------------------------------------ 



// Get the modal
// const employee = document.querySelectorAll('.employee')[0];

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// window.onload = function() {
    // const emp = document.querySelector('#emp0'); 
    // console.log(emp, "emp")
    // const emp = document.querySelector('#emp0');
    // console.log(emp, "const emp = document.querySelector('#emp0'); console.log(emp, 'emp')");

    
// }


// const emp = document.getElementById('emp0');
// console.log(emp, "emp");

// emp.addEventListener('click', function(event) {
//     console.log('hi');
// });

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modals) {
    modals.style.display = "none";
  }
}
