export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email: string, password: string) => {
    let resStatus = 0;
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then((res) => {
            resStatus = res.status;
            return res.json();
        })
        .then((data) => {
            console.log(data);
            switch (resStatus) {
                case 201:
                    return data;
                case 400:
                    if (data.error) throw data.error;
                    if (data.message) throw data.message;
                    return Promise.reject();
                default:
                    return Promise.reject();
            }
        });
};

export const authorize = (email: string, password: string) => {
    let resStatus = 0;
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then((res) => {
            resStatus = res.status;
            return res.json();
        })
        .then((data) => {
            switch (resStatus) {
                case 200:
                    if (data.token) {
                        localStorage.setItem('jwt', data.token);
                        return data;
                    }
                    return data;
                case 401:
                    if (data.message) throw data.message;
                    return Promise.reject();
                default:
                    return Promise.reject();
            }
        });
};

export const checkToken = (token: string) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .then((data) => data.data);
};
