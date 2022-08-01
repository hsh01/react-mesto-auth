import * as React from "react";
import {useEffect, useState} from "react";
import {Header} from "../../components/Header";
import {SignForm} from "../../components/SignForm";
import {Input} from "../../components/Input";
import {Link} from "react-router-dom";
import {Router} from "../../router";
import * as auth from "../../utils/auth";
import {InfoTooltip} from "../../components/InfoTooltip";

const Register = () => {
    const initialValues = {email: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialValues);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        setFormValues(initialValues);
        setShowSuccessPopup(false);
        setShowErrorPopup(false);
        setErrorMessage('');
    }, []);
    useEffect(() => {
        setIsButtonDisabled(Object.values(formErrors).some((value) => value.length) ||
            !Object.values(formValues).every((value) => value.length));
    }, [formValues, formErrors]);
    const handleChange = (e) => {
        const {name, value, validationMessage} = e.target;
        setFormErrors({...formErrors, [name]: validationMessage});
        setFormValues({...formValues, [name]: value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValues.email || !formValues.password) {
            return;
        }
        return auth.register(formValues.email, formValues.password)
            .then((data) => {
                if (data.data) {
                    setShowSuccessPopup(true);
                } else {
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
        <Header menu={<Link className="header__menu-item" to={Router.LOGIN}>Войти</Link>}/>
        <SignForm name="register" title="Регистрация" onSubmit={handleSubmit} buttonDisabled={isButtonDisabled}
                  buttonLabel="Зарегистрироваться">
            <fieldset className="form__set">
                <Input title="Email" name="email" type="email" onChange={handleChange} error={formErrors.email}
                       value={formValues.email} dark={true}/>
                <Input title="Пароль" name="password" type="password" minLength={8} onChange={handleChange}
                       error={formErrors.password} value={formValues.password} dark={true}/>
            </fieldset>
        </SignForm>
        <p className="form__tip">Уже зарегистрированы? <Link className="form__tip" to={Router.LOGIN}>Войти</Link>
        </p>
        {showSuccessPopup &&
        <InfoTooltip type="success" isOpen={showSuccessPopup} onClose={handleClosePopups}/>}
        {showErrorPopup &&
        <InfoTooltip type="error" isOpen={showErrorPopup} onClose={handleClosePopups} message={errorMessage}/>}
    </>);
};
export {Register};