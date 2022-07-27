import * as React from 'react';
import {useEffect, useState} from 'react';
import {PopupWithForm} from "../PopupWithForm";
import {Input} from "../Input";

export const AddPlacePopup = ({isOpen, onClose, onCardAdd}) => {
    const initialValues = {name: "", link: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialValues);
    useEffect(() => {
        setFormValues(initialValues);
    }, [isOpen]);
    const handleChange = (e) => {
        const {name, value, validationMessage} = e.target;
        setFormErrors({...formErrors, [name]: validationMessage});
        setFormValues({...formValues, [name]: value});
    };
    const handleSubmit = () => {
        return onCardAdd(formValues);
    };
    return (<PopupWithForm title="Новое место" name="add_place" buttonLabel="Создать" onClose={onClose} isOpen={isOpen}
                           onSubmit={handleSubmit}
                           buttonDisabled={Object.values(formErrors).some((value) => value.length) ||
                           !Object.values(formValues).every((value) => value.length)}>
        <fieldset className="form__set">
            <Input title="Название:" name="name" minLength={2} maxLength={30} onChange={handleChange}
                   error={formErrors.name} value={formValues.name}/>
            <Input title="Ссылка на картинку:" name="link" type="url" onChange={handleChange} error={formErrors.link}
                   value={formValues.link}/>
        </fieldset>
    </PopupWithForm>);
};
