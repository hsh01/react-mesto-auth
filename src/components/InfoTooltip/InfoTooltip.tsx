import React from 'react';
import {Popup} from '../Popup';

type Props = {
    type: 'success' | 'error';
    isOpen: boolean;
    onClose: () => void;
    message?: string;
};

export const InfoTooltip = ({type, isOpen, onClose, message}: Props) => {
    function getMessage() {
        if (message) return <>{message}!</>;
        if (type === 'success') {
            return <>Вы успешно зарегистрировались!</>;
        }
        if (type === 'error')
            return (
                <>
                    <p>
                        Что-то пошло не так!
                        <br />
                        Попробуйте ещё раз.
                    </p>
                </>
            );
        return '';
    }

    return (
        <Popup isOpen={isOpen} name='infotooltip' onClose={onClose}>
            <>
                {type === 'success' && <img src={require('../../images/IconSuccess.png')} alt='success' />}
                {type === 'error' && <img src={require('../../images/IconError.png')} alt='error' />}
                <div className='popup__text popup__text_infotooltip'>{getMessage()}</div>
            </>
        </Popup>
    );
};
