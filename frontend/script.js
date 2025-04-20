const apiUrl = "http://192.168.30.146:8000"


function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');

    if (username === '' || password === '') {
        message.textContent = 'Please fill in both fields.';
        return;
    }


    fetch('${apiUrl}/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'success') {
                message.textContent = 'Login successful!';
                // Redirect or perform further actions
            } else {
                message.textContent = 'Login failed. Please try again.';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            message.textContent = 'An error occurred. Please try again later.';
        });
}
