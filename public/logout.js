// logout.js

// Function to handle logout
function handleLogout() {
    // Clear session storage
    sessionStorage.removeItem('token');

    // Show a confirmation message
    alert('You have been logged out.');

    // Redirect to the login page
    window.location.href = 'index.html'; // Ensure this URL is correct for your application
}

// Add event listener to the logout button
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }
});
