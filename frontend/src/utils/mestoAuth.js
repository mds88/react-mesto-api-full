const BASE_URL = 'https://api.immortal.nomoredomains.club';

function registr(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse)
}

function login(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse)
}

function getToken(token) {
    return fetch(`${BASE_URL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
        .then(checkResponse)
}

function unLogin() {
    return fetch(`${BASE_URL}/signout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(checkResponse)
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export {registr, login, getToken, unLogin};