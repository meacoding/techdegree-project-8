const main = document.querySelector('.main-content'); 
const modals = document.querySelector('.modals');

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
        const dob = new Date(data[i].dob.date);

        const name = data[i].name.first + " " + data[i].name.last;
        const email = data[i].email;
        const city = data[i].location.city;
        const img = data[i].picture.large;
        const phone = data[i].phone;
        const address = data[i].location.street + " " + data[i].location.city
            + ", " + data[i].location.state + " " + data[i].location.postcode;
        const birthday = "Birthday: " + dob.toDateString();

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

        const modal = document.createElement('div');
        modal.classList = 'modal-content';
        modal.id = `emp${i}`;
        const htmlModal = `
            <span class="close">&times;</span>
            <div class="employee-info">
                <img class="employee-img" src="${img}" alt="">
                <h2 class="name">${name}</h2>
                <p class="email">${email}</p>
                <p class="city">${city}</p>
            </div>
            <div class="line"></div>
            <div class="employee-info">
                <p class="phone">${phone}</p>
                <p class="address">${address}</p>
                <p class="birthday">${birthday}</p>
            </div>
            <div class="cycleThroughEmployees">
                <span class="previous">&#8249;</span>
                <span class="next">&#8250;</span>
            </div>
        `;
        modal.innerHTML = htmlModal;
        modals.appendChild(modal);

        $('.employee').click(function(){
            let index = $('.employee').index(this);
            $('.modals').fadeIn();
            $(`#emp${index}`).fadeIn( function (){
                this.style.display = "flex";
            });
        })
        $('.close').click(function(){
            $(modal).hide();
            $(modals).hide();
        })
        
        const modalContent = document.querySelectorAll('.modal-content');

        $(modals).click(function(event){
            if (event.target == modals) {
                $(modal).hide();
                $(modals).hide();
            }
        })

        $('.next').click(function() {
            var $id = $(this).parent().parent();
            var $next = $id.next();

            if( $next.length == 0 ) {
                $next = $id.prevAll().last();
            }
            
            $($next).show().css('display', 'flex');
            $($id).hide();
        })

        $('.previous').click(function() {
            var $id = $(this).parent().parent();
            var $prev = $id.prev();

            if( $prev.length == 0 ) {
                $prev = $id.nextAll().last();
            }
            $($prev).show().css('display', 'flex');
            $($id).hide();
        })

    };
    
}

window.onclick = function(event) {
    if (event.target == modals) {
      modals.style.display = "none";
    }
}