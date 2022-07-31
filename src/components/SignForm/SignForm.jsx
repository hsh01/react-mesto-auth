import React, { useEffect, useState } from 'react';
export const SignForm = ({ title, name, children, onSubmit, buttonDisabled = true, isOpen = false, buttonLabel = 'Войти', }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(false);
    }, [isOpen]);
    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        onSubmit(e).then(() => {
            setLoading(false);
        })
            .catch((error) => {
            console.log('error', error);
            setLoading(false);
        });
    }
    return (<>
            <form className="form form_dark" name={name} noValidate onSubmit={handleSubmit}>
                <h2 className="form__header form__header_center">{title}</h2>
                {children}
                <button className={`form__submit form__submit_sign` +
            `${buttonDisabled ? ' form__submit_disabled' : ''}` +
            `${loading ? ' form__submit_loading' : ''}`} type="submit">
                    {buttonLabel}
                </button>
            </form>
        </>);
};
