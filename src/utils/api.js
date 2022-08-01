class Api {
    _baseUrl;
    _headers;

    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _request(path, options = undefined) {
        options = {
            ...options,
            headers: {...options?.headers, ...this._headers}
        };
        return fetch(`${this._baseUrl}/${path}`, options)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            });
    }

    getUserInfo() {
        const path = 'users/me';
        return this._request(path);
    }

    patchUserInfo(data) {
        const path = 'users/me';
        return this._request(path, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }

    patchUserAvatar(data) {
        const path = `users/me/avatar`;
        return this._request(path, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }

    getCards() {
        const path = 'cards';
        return this._request(path, {});
    }

    postCard(data) {
        const path = 'cards';
        return this._request(path, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    deleteCard(cardId) {
        const path = `cards/${cardId}`;
        return this._request(path, {
            method: 'DELETE',
        });
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this._putLike(cardId);
        } else {
            return this._deleteLike(cardId);
        }
    }

    _putLike(cardId) {
        const path = `cards/${cardId}/likes`;
        return this._request(path, {
            method: 'PUT',
        });
    }

    _deleteLike(cardId) {
        const path = `cards/${cardId}/likes`;
        return this._request(path, {
            method: 'DELETE',
        });
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
    headers: {
        authorization: process.env.REACT_APP_API_TOKEN,
        'Content-Type': 'application/json'
    }
});
export {api};
