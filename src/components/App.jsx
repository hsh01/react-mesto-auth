import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {ProtectedRoute} from './ProtectedRoute';
import {Home} from '../pages/Home';
import {Register} from '../pages/Register';
import {Login} from '../pages/Login';
import {Router} from '../router';
import * as auth from '../utils/auth';
import {AppContext} from '../contexts/AppContext';
const App = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    function handleLogin() {
        setLoggedIn(true);
    }
    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            if (jwt) {
                auth.checkToken(jwt)
                    .then((res) => {
                        if (res) {
                            setUserData(res);
                            setLoggedIn(true);
                        }
                    })
                    .then(() => navigate(Router.HOME, {replace: true}))
                    .catch((err) => console.log(err));
            }
        }
    }, [navigate]);
    return (
        <AppContext.Provider value={{loggedIn, handleLogin, userData}}>
            <Routes>
                <Route path={Router.REGISTER} element={<Register />} />
                <Route path={Router.LOGIN} element={<Login />} />
                <Route
                    path={Router.HOME}
                    element={
                        <ProtectedRoute redirectTo={Router.LOGIN}>
                            <Home />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AppContext.Provider>
    );
};
export default App;
