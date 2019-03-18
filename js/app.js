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
    // console.log(data);

    for (let i = 0; i < data.length; i++){
        const name = data[i].name.first + " " + data[i].name.last;
        const email = data[i].email;
        const city = data[i].location.city;
        const img = data[i].picture.large;
        const phone = data[i].phone;
        const address = data[i].location.street + " " + data[i].location.city
            + ", " + data[i].location.state + " " + data[i].location.postcode;
        
        const date = new Date(data[i].dob.date);
        function formatDate(date) {
            
            const monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];
            const day = date.getDate();
            const monthIndex = date.getMonth();
            const year = date.getFullYear();
            
            return `${monthNames[monthIndex]} ${day}, ${year}`;
        }
        
        const birthday = `Birthday: ${formatDate(date)}`;
        
        // Create employee card
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

        // Create employee card modal
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

        // Display modal for employee clicked
        $('.employee').click(function(){
            let index = $('.employee').index(this);
            $('.modals').fadeIn();
            $(`#emp${index}`).fadeIn( function (){
                this.style.display = "flex";
            });
        })

        // Close modal by pressing X
        $('.close').click(function(){
            $(modal).hide();
            $(modals).hide();
        })

        // Close modal by pressing outside modal card
        $(modals).click(function(event){
            if (event.target == modals) {
                $(modal).hide();
                $(modals).hide();
            }
        })

        // Press > goes to next employee modal
        $('.next').click(function() {
            var $id = $(this).parent().parent();
            var $next = $id.next();

            if( $next.length == 0 ) {
                $next = $id.prevAll().last();
            }
            
            $($next).show().css('display', 'flex');
            $($id).hide();
        })

        // Press < goes to previous employee modal
        $('.previous').click(function() {
            var $id = $(this).parent().parent();
            var $prev = $id.prev();

            if( $prev.length == 0 ) {
                $prev = $id.nextAll().last();
            }
            $($prev).show().css('display', 'flex');
            $($id).hide();
        })

        // Function for input field for searching employees by name or email
        // Project calls for searching name or username but at no point do we 
        // handle usernames in this project.

        function filterNames() {
            //Get value of .search input
            let $searchInput = $('#search')
              .val()
              .toUpperCase();
        
            //Locate all names tied to .name
            let $names = $('.name');
            let $emails = $('.email');
        
            //Loop through names or email addresses.
            for (let i = 0; i < $names.length; i++) {
              let $name = $($names[i]).text();
              let $email = $($emails[i]).text();
        
              //If matched, filter out images
              if ($name.toUpperCase().indexOf($searchInput) > -1 || 
                  $email.toUpperCase().indexOf($searchInput) > -1) {
                $($names[i]).parent().parent().css({ display: "" });
              } else {
                $($names[i]).parent().parent().css({ display: "none" });
              }
            }
        }

        //Event listener for input field
        $('#search').keyup(filterNames);

        
        // Project calls to add a hover state to entire row.
        // This isn't an elegant solution by any means but it works.

        $('.employee').mouseover(function(){
            let index = $('.employee').index(this);
            if (index === 0 || index === 1 || index === 2) {
                $('.employee').eq(0).css('background-color', 'skyblue');
                $('.employee').eq(1).css('background-color', 'skyblue');
                $('.employee').eq(2).css('background-color', 'skyblue');
            } else if (index === 3 || index === 4 || index === 5) {
                $('.employee').eq(3).css('background-color', 'skyblue');
                $('.employee').eq(4).css('background-color', 'skyblue');
                $('.employee').eq(5).css('background-color', 'skyblue');
            } else if (index === 6 || index === 7 || index === 8) {
                $('.employee').eq(6).css('background-color', 'skyblue');
                $('.employee').eq(7).css('background-color', 'skyblue');
                $('.employee').eq(8).css('background-color', 'skyblue');
            } else if (index === 9 || index === 10 || index === 11) {
                $('.employee').eq(9).css('background-color', 'skyblue');
                $('.employee').eq(10).css('background-color', 'skyblue');
                $('.employee').eq(11).css('background-color', 'skyblue');
            }
        });

        $('.employee').mouseleave(function(){
            let index = $('.employee').index(this);
            if (index === 0 || index === 1 || index === 2) {
                $('.employee').eq(0).css('background-color', '#fff');
                $('.employee').eq(1).css('background-color', '#fff');
                $('.employee').eq(2).css('background-color', '#fff');
            } else if (index === 3 || index === 4 || index === 5) {
                $('.employee').eq(3).css('background-color', '#fff');
                $('.employee').eq(4).css('background-color', '#fff');
                $('.employee').eq(5).css('background-color', '#fff');
            } else if (index === 6 || index === 7 || index === 8) {
                $('.employee').eq(6).css('background-color', '#fff');
                $('.employee').eq(7).css('background-color', '#fff');
                $('.employee').eq(8).css('background-color', '#fff');
            } else if (index === 9 || index === 10 || index === 11) {
                $('.employee').eq(9).css('background-color', '#fff');
                $('.employee').eq(10).css('background-color', '#fff');
                $('.employee').eq(11).css('background-color', '#fff');
            }
        })

    };
    
}