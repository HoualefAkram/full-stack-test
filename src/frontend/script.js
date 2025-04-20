const apiUrl = "http://192.168.41.224:8000/course"

window.onload = function() {
    initUsername()
    refreshDataEvery2Sec()
}


function showMessage(message) {
    const messageDoc = document.getElementById('message');
    messageDoc.textContent = message
}


function login() {
    const users = {
        "Houalef": "1234",
        "Omar": "0000",
        "Issam": "5555",
        "Mehdi": "1111",
    };
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === '' || password === '') {
        showMessage('Please fill in both fields.')
        return;
    }

    if (users[username] === password) {
        localStorage.setItem('loggedInUser', username);
        window.location.href = "/static/home.html";
        return;
    }

    showMessage("Invalid credentials!")
}

function addCourse() {
    const input = document.getElementById("courseInput");
    const courseName = input.value.trim();
    if (courseName) {
        addCourseToDb(courseName)
        input.value = '';
    }
}


function initUsername() {
    const username = localStorage.getItem('loggedInUser');
    if (username) {
        document.getElementById('name').textContent = `Hello, ${username}`;
    }
}


function addCourseToDb(courseName) {
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: courseName,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Success:", data);
        })
        .catch(error => {
            console.error("Error:", error);
            const listItem = document.createElement("li");
            listItem.textContent = courseName;
            courseList.appendChild(listItem);
        });
}

function fetchData() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            updatePageWithData(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}


function refreshDataEvery2Sec() {
    fetchData();
    setInterval(fetchData, 500);
}

function updatePageWithData(data) {
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = "";
    if (Array.isArray(data.data)) {
        data.data.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            courseList.appendChild(listItem);
        });
    } else {
        console.error("Unexpected data format:", data);
    }
}