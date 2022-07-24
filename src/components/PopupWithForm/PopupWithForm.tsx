import * as React from 'react';
import {useCallback} from 'react';
import {UserInfoModel} from "../../models/UserInfoModel";

type Props = {
    title: string,
    name: string,
    onClose: () => void,
    isOpen?: boolean,
    buttonLabel?: string,
    children?: React.ReactNode,
    onSubmit?: (e: any) => void,
};
export const PopupWithForm = ({title, name, children, onClose, isOpen=false, buttonLabel='Сохранить', onSubmit}: Props) => {

    const handleMouseDown = useCallback((event: any) => {
        if (event.target.classList.contains('popup_opened')
            || event.target.classList.contains('popup__close')) {
            onClose();
        }
    }, [onClose]);

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={handleMouseDown}>
            <div className="popup__container">
                <button className="popup__close" type="button" title="закрыть" aria-label="закрыть"/>
                <form className="form" name={name} noValidate onSubmit={onSubmit}>
                    <h2 className="form__header">{title}</h2>
                    {children}
                    <button className="form__submit" type="submit">{buttonLabel}</button>
                </form>
            </div>
        </div>
    );
};