// Handles the logic for the rent page
const inputField = document.querySelector('#demo-one-input');
const priceField = document.querySelector('#price');
const totalField = document.querySelector('#totalPrice');
const bookBtn = document.querySelector('#book');
const loggedCustomer = document.querySelector('#loggedCustomer')
let reservationData;
let email = loggedCustomer.innerHTML

// Add an event listener for the focus event
inputField.addEventListener('focus', function () {
    if ((inputField.value !== '')) { //if the input field has data
        const currentUrl = window.location.href; // get the current URL
        const parts = currentUrl.split("/");
        const carId = parts[parts.length - 1]; // extract the carID out of the URL
        const reservationDate = inputField.value;
        const reservationArray = reservationDate.split("-");
        const pickupDate = reservationArray[0]; //extra the pickup date from the input field
        const returnDate = reservationArray[1]; //extra the return date from the input field
        //change the date format to use the math function
        const date1 = new Date(pickupDate);
        const date2 = new Date(returnDate);
        //math to figure out the total number of days
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const numberDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const priceArray = priceField.innerHTML.split('$');
        const dayPrice = priceArray[1];
        const totalPrice = numberDays * dayPrice; //calculate the total price
        reservationData = {
            "email": email,
            "carId": carId,
            "pickup": pickupDate,
            "return": returnDate,
            "price": totalPrice
        }
        //formatting the totalfield depending on the number of days
        if (numberDays == 0) {
            const minDays = 1;
            totalField.innerHTML = `Your rental is for ${minDays} day, your total price is $${dayPrice}`
        }
        else if (numberDays == 1) {
            totalField.innerHTML = `Your rental is for ${numberDays} day, your total price is $${totalPrice}`
        }
        else {
            totalField.innerHTML = `Your rental is for ${numberDays} days, your total price is $${totalPrice}`
        }
    }
});
// Add an event listener for the onclick event
bookBtn.addEventListener('click', function () {
    //sends the reservation data
    fetch('http://localhost:3001/reservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
    })
        .then(showModal())
        .catch(error => console.error(error))
});
//gives a reservation confirmation in a modal
function showModal() {
    // Get the modal element by ID
    const modal = document.getElementById('myModal');

    // Create a Bootstrap modal instance from the modal element
    const modalInstance = new bootstrap.Modal(modal);

    // Show the modal
    modalInstance.show();
}