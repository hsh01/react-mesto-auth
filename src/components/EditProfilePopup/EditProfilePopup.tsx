import * as React from 'react';
import {useEffect, useState} from 'react';
import {PopupWithForm} from "../PopupWithForm";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import {Input} from "../Input";

type Props = {
    isOpen: boolean
    onClose: () => void,
    onUpdateUser: (user: { name: string; about: string }) => void,
};

type UserRequest = {
    name: string,
    about: string
}

export const EditProfilePopup = ({isOpen, onClose, onUpdateUser}: Props) => {
    const currentUser = React.useContext(CurrentUserContext);

    const initialValues = {name: "", about: ""};
    const [formValues, setFormValues] = useState<UserRequest>(currentUser);
    const [formErrors, setFormErrors] = useState<UserRequest>(initialValues);

    useEffect(() => {
        setFormValues(currentUser);
    }, [currentUser, isOpen]);

    const handleChange = (e: any) => {
        const {name, value, validationMessage} = e.target;
        setFormErrors({...formErrors, [name]: validationMessage});
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = () => {
        return onUpdateUser(formValues);
    };

    return (
        <PopupWithForm title="Редактировать профиль" name="edit_profile"
                       onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit}
                       buttonDisabled={Object.values(formErrors).some((value: string) => value.length) ||
                       !Object.values(formValues).every((value: string) => value.length)
                       || (formValues.name == currentUser.name && formValues.about == currentUser.about)}
        >
            <fieldset className="form__set">
                <Input title="Имя:"
                       name="name"
                       minLength={2}
                       maxLength={40}
                       onChange={handleChange}
                       error={formErrors.name}
                       value={formValues.name}
                />
                <Input title="О себе:"
                       name="about"
                       minLength={2}
                       maxLength={200}
                       onChange={handleChange}
                       error={formErrors.about}
                       value={formValues.about}
                />
            </fieldset>
        </PopupWithForm>
    );
};