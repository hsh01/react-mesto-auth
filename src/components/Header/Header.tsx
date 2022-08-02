import * as React from 'react';

type Props = {
    menu?: any;
};

export const Header = (props: Props) => {
    return (
        <header className='header'>
            <div className='header__logo' />
            <div className='header__menu'>{props.menu}</div>
        </header>
    );
};
