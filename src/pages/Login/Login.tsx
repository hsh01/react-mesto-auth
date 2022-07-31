import * as React from "react";
import {FunctionComponent, useContext, useEffect, useState} from "react";
import {Header} from "../../components/Header";
import {SignForm} from "../../components/SignForm";
import {Input} from "../../components/Input";
import {Link, useNavigate} from "react-router-dom";
import {Router} from "../../router";
import * as auth from "../../utils/auth";
import {InfoTooltip} from "../../components/InfoTooltip";
import {AppContext} from "../../context/AppContext";

const Login: FunctionComponent = () => {
    const appContext = useContext(AppContext);

    const initialValues = {email: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialValues);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setFormValues(initialValues);
        setShowErrorPopup(false);
        setErrorMessage('');
    }, []);

    useEffect(() => {
        setIsButtonDisabled(Object.values(formErrors).some((value: string) => value.length) ||
            !Object.values(formValues).every((value: string) => value.length));
    }, [formValues, formErrors]);

    const handleChange = (e: any) => {
        const {name, value, validationMessage} = e.target;
        setFormErrors({...formErrors, [name]: validationMessage});
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!formValues || !formValues.password) {
            return;
        }
        return auth.authorize(formValues.email, formValues.password)
            .then((data) => {
                if (data.token) {
                    setFormValues({email: '', password: ''});
                } else {
                    throw data;
                }
            })
            .then(() => {
                appContext.handleLogin();
                navigate(Router.HOME, {replace: true});
            })
            .catch(err => {
                setErrorMessage(err);
                setShowErrorPopup(true);
            });
    };

    const handleCloseError = () => {
        setShowErrorPopup(false);
    }

    return (
        <>
            <Header menu={<Link className="header__menu-item" to={Router.REGISTER}>Регистрация</Link>}/>
            <SignForm name="login" title="Вход" onSubmit={handleSubmit} buttonDisabled={isButtonDisabled}>
                <fieldset className="form__set">
                    <Input title="Email"
                           name="email"
                           type="email"
                           onChange={handleChange}
                           error={formErrors.email}
                           value={formValues.email}
                           dark={true}
                    />
                    <Input title="Пароль"
                           name="password"
                           type="password"
                           minLength={8}
                           onChange={handleChange}
                           error={formErrors.password}
                           value={formValues.password}
                           dark={true}
                    />
                </fieldset>
            </SignForm>
            {
                showErrorPopup &&
                <InfoTooltip type="error" isOpen={showErrorPopup} onClose={handleCloseError} message={errorMessage}/>
            }
        </>
    );
}

export {Login};
