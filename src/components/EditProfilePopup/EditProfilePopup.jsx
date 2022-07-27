import * as React from 'react';
import {useEffect, useState} from 'react';
import {PopupWithForm} from "../PopupWithForm";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import {Input} from "../Input";

export const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {
    const currentUser = React.useContext(CurrentUserContext);
    const initialValues = {name: "", about: ""};
    const [formValues, setFormValues] = useState(currentUser);
    const [formErrors, setFormErrors] = useState(initialValues);
    useEffect(() => {
        setFormValues(currentUser);
    }, [currentUser, isOpen]);
    const handleChange = (e) => {
        const {name, value, validationMessage} = e.target;
        setFormErrors({...formErrors, [name]: validationMessage});
        setFormValues({...formValues, [name]: value});
    };
    const handleSubmit = () => {
        return onUpdateUser(formValues);
    };
    return (<PopupWithForm title="Редактировать профиль" name="edit_profile" onClose={onClose} isOpen={isOpen}
                           onSubmit={handleSubmit}
                           buttonDisabled={Object.values(formErrors).some((value) => value.length) ||
                           !Object.values(formValues).every((value) => value.length)
                           || (formValues.name == currentUser.name && formValues.about == currentUser.about)}>
        <fieldset className="form__set">
            <Input title="Имя:" name="name" minLength={2} maxLength={40} onChange={handleChange} error={formErrors.name}
                   value={formValues.name}/>
            <Input title="О себе:" name="about" minLength={2} maxLength={200} onChange={handleChange}
                   error={formErrors.about} value={formValues.about}/>
        </fieldset>
    </PopupWithForm>);
};
