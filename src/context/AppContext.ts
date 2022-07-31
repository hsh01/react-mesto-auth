import React from 'react';

export const AppContext = React.createContext<{
    loggedIn: boolean,
    handleLogin: () => void,
    userData?: {_id: string, email: string} | null,
}>({
    loggedIn: false,
    handleLogin: () => {},
    userData: null,
});