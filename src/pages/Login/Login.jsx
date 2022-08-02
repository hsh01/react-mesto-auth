import * as React from 'react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Header } from '../../components/Header';
import { SignForm } from '../../components/SignForm';
import { Input } from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { Router } from '../../router';
import * as auth from '../../utils/auth';
import { InfoTooltip } from '../../components/InfoTooltip';
import { AppContext } from '../../contexts/AppContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
const Login = () => {
    const appContext = useContext(AppContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
    const initialValues = useMemo(() => {
        return { email: '', password: '' };
    }, []);
    const navigate = useNavigate();
    useEffect(() => {
        resetForm(initialValues);
    }, [resetForm, initialValues]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        return auth
            .authorize(values.email, values.password)
            .then((data) => {
            if (data.token) {
                resetForm(initialValues);
            }
            else {
                throw data;
            }
        })
            .then(() => {
            appContext.handleLogin();
            navigate(Router.HOME, { replace: true });
        })
            .catch((err) => {
            console.log(err);
            setErrorMessage(err.toString());
            setShowErrorPopup(true);
        });
    };
    const handleCloseError = () => {
        setShowErrorPopup(false);
    };
    return (<>
            <Header menu={<Link className='header__menu-item' to={Router.REGISTER}>
                        Регистрация
                    </Link>}/>
            <SignForm name='login' title='Вход' onSubmit={handleSubmit} buttonDisabled={!isValid}>
                <fieldset className='form__set'>
                    <Input title='Email' name='email' type='email' onChange={handleChange} error={errors.email} value={values.email} required={true} dark={true}/>
                    <Input title='Пароль' name='password' type='password' minLength={8} onChange={handleChange} error={errors.password} value={values.password} required={true} dark={true}/>
                </fieldset>
            </SignForm>
            <InfoTooltip type='error' isOpen={showErrorPopup} onClose={handleCloseError} message={errorMessage}/>
        </>);
};
export { Login };
