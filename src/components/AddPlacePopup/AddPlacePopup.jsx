import * as React from 'react';
import {useEffect} from 'react';
import {PopupWithForm} from "../PopupWithForm";
import {Input} from "../Input";
import {useFormAndValidation} from "../../hooks/useFormAndValidation";

export const AddPlacePopup = ({isOpen, onClose, onCardAdd}) => {
    const initialValues = {name: "", link: ""};
    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();
    useEffect(() => {
        resetForm(initialValues);
    }, []);
    const handleSubmit = () => {
        return onCardAdd(values).then(() => resetForm(initialValues));
    };
    return (<PopupWithForm title="Новое место" name="add_place" buttonLabel="Создать" onClose={onClose} isOpen={isOpen}
                           onSubmit={handleSubmit} buttonDisabled={!isValid}>
        <fieldset className="form__set">
            <Input title="Название:" name="name" minLength={2} maxLength={30} onChange={handleChange}
                   error={errors.name} value={values.name}/>
            <Input title="Ссылка на картинку:" name="link" type="url" onChange={handleChange} error={errors.link}
                   value={values.link}/>
        </fieldset>
    </PopupWithForm>);
};
