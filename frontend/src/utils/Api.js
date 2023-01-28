//Описание API класса и методов
class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getProfileInfo() {
        const urlResource = '/users/me';

        return fetch(this._baseUrl + urlResource, {
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._checkResponse)
    }

    getInitialCards() {
        const urlResource = '/cards';

        return fetch(this._baseUrl + urlResource, {
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._checkResponse)
    }

    setProfileInfo(data) {
        const urlResource = '/users/me';

        return fetch(this._baseUrl + urlResource, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkResponse)
    }

    addCard(data) {
        const urlResource = '/cards';

        return fetch(this._baseUrl + urlResource, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse)
    }

    delCard(idPic) {
        const urlResource = '/cards/' + idPic;

        return fetch(this._baseUrl + urlResource, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._checkResponse)
    }

    setLike(cardIsLiked, idPic) {
        const urlResource = '/cards/' + idPic + '/likes';

        if (!cardIsLiked) {
            this._methodUrl = 'PUT';
        } else {
            this._methodUrl = 'DELETE';
        }

        return fetch(this._baseUrl + urlResource, {
            method: this._methodUrl,
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._checkResponse)
    }

    setAvatar(linkAvatar) {
        const urlResource = '/users/me/avatar';

        return fetch(this._baseUrl + urlResource, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                avatar: linkAvatar
            })
        })
            .then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const api = new Api({
    baseUrl: `https://api.immortal.nomoredomains.club`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;