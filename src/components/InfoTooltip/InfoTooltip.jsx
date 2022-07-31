import React, { useCallback } from 'react';
export const InfoTooltip = ({ type, isOpen, onClose, message }) => {
    const handleMouseDown = useCallback((event) => {
        if (event.target.classList.contains('popup_opened')
            || event.target.classList.contains('popup__close')) {
            onClose();
        }
    }, [onClose]);
    function getMessage() {
        if (message)
            return <>{message}!</>;
        if (type === "success") {
            return <>Вы успешно зарегистрировались!</>;
        }
        if (type === "error")
            return (<>
                <p>Что-то пошло не так!<br />Попробуйте ещё раз.</p>
            </>);
        return '';
    }
    return (<div className={`popup${isOpen ? ' popup_opened' : ''}`} onMouseDown={handleMouseDown}>
            <div className="popup__container">
                <button className="popup__close" type="button" title="закрыть" aria-label="закрыть"/>
                <div className="infotooltip">
                    {type === "success" &&
            <img src={require('../../images/IconSuccess.png')} alt="success"/>}
                    {type === "error" &&
            <img src={require('../../images/IconError.png')} alt="error"/>}
                    <p className="infotooltip__text">{getMessage()}</p>
                </div>
            </div>
        </div>);
};
