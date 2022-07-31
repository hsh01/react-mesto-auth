import {Simulate} from "react-dom/test-utils";

export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email: string, password: string) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.data) {
                return data.data;
            }
            if (data.error) {
                throw data.error;
            }
        }, (err) => console.log(err));
};

export const authorize = (email: string, password: string) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then((response => response.json()))
        .then((data) => {
            if (data.message) {
                throw data.message;
            }
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
        })
        .catch(err => {
            console.log(err);
            return err;
        });
};

export const checkToken = (token: string) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => res.json())
        .then(data => data.data)
}