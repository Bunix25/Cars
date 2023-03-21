// Handles the logic for the logout
const logoutHandler = async () => {
    await fetch('/api/logmeout', {
        method: 'POST',
        credentials: 'same-origin' // include cookies in the request
    })
        .then(response => {
            if (response.ok) {
                console.log('Logout successful!');
                location.reload();
            } else {
                console.error('Logout failed:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Logout failed:', error);
        });
}

const loggedIn = document.querySelector('#login')
if (!loggedIn) {
    const logoutBtn = document.querySelector('#logout')
    logoutBtn.addEventListener(`click`, logoutHandler);
}