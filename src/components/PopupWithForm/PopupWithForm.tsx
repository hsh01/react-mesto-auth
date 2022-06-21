import * as React from 'react';
import {useCallback} from 'react';

type Props = {
    title: string,
    name: string,
    onClose: () => void,
    children?: React.ReactNode
};
export const PopupWithForm = ({title, name, children, onClose}: Props) => {

    const handleMouseDown = useCallback((event: any) => {
        if (event.target.classList.contains('popup_opened')
            || event.target.classList.contains('popup__close')) {
            onClose();
        }
    }, []);

    return (
        <div className={`popup popup_type_${name} popup_opened`} onMouseDown={handleMouseDown}>
            <div className="popup__container">
                <button className="popup__close" type="button" title="закрыть" aria-label="закрыть" onClick={onClose}/>
                <form className="form" name={name} noValidate>
                    <h2 className="form__header">{title}</h2>
                    {children}
                </form>
            </div>
        </div>
    );
};