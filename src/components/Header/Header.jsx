import * as React from 'react';

export const Header = (props) => {
    return (<header className="header">
        <div className="header__logo"/>
        <div className="header__menu">{props.menu}</div>
    </header>);
};
