import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {AppContext} from '../../contexts/AppContext';

type Props = {
    children: any;
    redirectTo: string;
};

const ProtectedRoute = ({children, redirectTo}: Props) => {
    const context = useContext(AppContext);
    return context.loggedIn ? children : <Navigate to={redirectTo} />;
};

export {ProtectedRoute};
