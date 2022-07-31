import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';

type Props = {
    title: string,
    name: string,
    onClose: () => void,
    isOpen?: boolean,
    buttonLabel?: string,
    children?: React.ReactNode,
    onSubmit: any,
    buttonDisabled?: boolean,
    submitting?: boolean,
    submitted?: boolean,
    submitError?: string,
};

export const PopupWithForm = ({
                                  title,
                                  name,
                                  children,
                                  onClose,
                                  onSubmit,
                                  buttonDisabled = true,
                                  isOpen = false,
                                  buttonLabel = 'Сохранить',
                              }: Props) => {

    const handleMouseDown = useCallback((event: any) => {
        if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
            onClose();
        }
    }, [onClose]);

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        setSubmitting(false);
        setSubmitted(false);
        setSubmitError('');
    }, [isOpen]);


    function handleSubmit(e: any) {
        e.preventDefault();
        setSubmitting(true);
        onSubmit(e).then(() => {
            setSubmitting(false);
            setSubmitted(true);
        })
            .then(() => {
                setTimeout(() => {
                    onClose();
                }, 1000);
            })
            .catch((error: any) => {
                console.log(error);
                setSubmitting(false);
                setSubmitError(error.toString());
            });
    }


    return (
        <div className={`popup${isOpen ? ' popup_opened' : ''}`} onMouseDown={handleMouseDown}>
            <div className="popup__container">
                <button className="popup__close" type="button" title="закрыть" aria-label="закрыть"/>
                <form className="form" name={name} noValidate onSubmit={handleSubmit}>
                    <h2 className="form__header">{title}</h2>
                    {children}
                    <button
                        className={`form__submit${
                            (buttonDisabled === true ? ' form__submit_disabled' : '')}${
                            (submitting ? ' form__submit_loading' : '')}${
                            (submitted ? ' form__submit_loading-ok' : '')}`}
                        type="submit">{submitError ? submitError : submitted ? '' : buttonLabel}</button>
                </form>
            </div>
        </div>
    );
};