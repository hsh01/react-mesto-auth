import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Header } from '../../components/Header';
import { SignForm } from '../../components/SignForm';
import { Input } from '../../components/Input';
import { Link } from 'react-router-dom';
import { Router } from '../../router';
import * as auth from '../../utils/auth';
import { InfoTooltip } from '../../components/InfoTooltip';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
    const initialValues = useMemo(() => {
        return { email: '', password: '' };
    }, []);
    useEffect(() => {
        resetForm(initialValues);
    }, [resetForm, initialValues]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        return auth
            .register(values.email, values.password)
            .then((data) => {
            if (data.data) {
                setShowSuccessPopup(true);
            }
            else {
                throw data;
            }
        })
            .catch((err) => {
            console.log(err);
            setErrorMessage(err.toString());
            setShowErrorPopup(true);
        });
    };
    const handleClosePopups = () => {
        setShowSuccessPopup(false);
        setShowErrorPopup(false);
    };
    return (<>
            <Header menu={<Link className='header__menu-item' to={Router.LOGIN}>
                        Войти
                    </Link>}/>
            <SignForm name='register' title='Регистрация' onSubmit={handleSubmit} buttonDisabled={!isValid} buttonLabel='Зарегистрироваться'>
                <fieldset className='form__set'>
                    <Input title='Email' name='email' type='email' onChange={handleChange} error={errors.email} value={values.email} dark={true} required={true}/>
                    <Input title='Пароль' name='password' type='password' minLength={8} onChange={handleChange} error={errors.password} value={values.password} dark={true} required={true}/>
                </fieldset>
            </SignForm>
            <p className='form__tip'>
                Уже зарегистрированы?{' '}
                <Link className='form__tip' to={Router.LOGIN}>
                    Войти
                </Link>
            </p>
            <InfoTooltip type='success' isOpen={showSuccessPopup} onClose={handleClosePopups}/>
            <InfoTooltip type='error' isOpen={showErrorPopup} onClose={handleClosePopups} message={errorMessage}/>
        </>);
};
export { Register };
