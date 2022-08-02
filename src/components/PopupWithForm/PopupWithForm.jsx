import * as React from 'react';
import {useEffect, useState} from 'react';
import {Popup} from '../Popup';
export const PopupWithForm = ({
    title,
    name,
    children,
    onClose,
    onSubmit,
    buttonDisabled = true,
    isOpen = false,
    buttonLabel = 'Сохранить'
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');
    useEffect(() => {
        setSubmitting(false);
        setSubmitted(false);
        setSubmitError('');
    }, [isOpen]);
    function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        new Promise((resolve) => {
            resolve(onSubmit(e));
        })
            .then(() => {
                setSubmitted(true);
            })
            .then(() => {
                setTimeout(() => {
                    onClose();
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
                setSubmitError(error.toString());
            })
            .finally(() => setSubmitting(false));
    }
    return (
        <Popup isOpen={isOpen} name={name} onClose={onClose}>
            <form className='form' name={name} noValidate onSubmit={handleSubmit}>
                <h2 className='form__header'>{title}</h2>
                {children}
                <button
                    className={`form__submit${buttonDisabled === true ? ' form__submit_disabled' : ''}${
                        submitting ? ' form__submit_loading' : ''
                    }${submitted ? ' form__submit_loading-ok' : ''}`}
                    type='submit'
                >
                    {submitError ? submitError : submitted ? '' : buttonLabel}
                </button>
            </form>
        </Popup>
    );
};
