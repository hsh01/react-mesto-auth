import React, {useContext} from 'react';
import {Navigate} from "react-router-dom";
import {AppContext} from "../../contexts/AppContext";

const ProtectedRoute = ({children, redirectTo}) => {
    const context = useContext(AppContext);
    return context.loggedIn ? children : <Navigate to={redirectTo}/>;
};
export {ProtectedRoute};
