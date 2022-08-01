import * as React from 'react';
import {useEffect, useState} from 'react';
import {PopupWithForm} from "../PopupWithForm";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {Input} from "../Input";
import {useFormAndValidation} from "../../hooks/useFormAndValidation";

type Props = {
    isOpen: boolean
    onClose: () => void,
    onUpdateUser: (user: { name: string; about: string }) => void,
};

export const EditProfilePopup = ({isOpen, onClose, onUpdateUser}: Props) => {
    const currentUser = React.useContext(CurrentUserContext);
    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

    const handleSubmit = () => {
        return onUpdateUser(values);
    };

    useEffect(() => {
        resetForm(currentUser);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm title="Редактировать профиль" name="edit_profile"
                       onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit}
                       buttonDisabled={!isValid || (values.name == currentUser.name && values.about == currentUser.about)}
        >
            <fieldset className="form__set">
                <Input title="Имя:"
                       name="name"
                       minLength={2}
                       maxLength={40}
                       onChange={handleChange}
                       error={errors.name}
                       value={values.name}
                />
                <Input title="О себе:"
                       name="about"
                       minLength={2}
                       maxLength={200}
                       onChange={handleChange}
                       error={errors.about}
                       value={values.about}
                />
            </fieldset>
        </PopupWithForm>
    );
};