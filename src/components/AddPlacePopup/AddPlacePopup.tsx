import * as React from 'react';
import {useEffect, useState} from 'react';
import {CardModel} from "../../models/CardModel";
import {PopupWithForm} from "../PopupWithForm";
import {Input} from "../Input";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    onCardAdd: (card: CardModel) => void,
};

type CardRequest = {
    name: string,
    link: string
}

export const AddPlacePopup = ({isOpen, onClose, onCardAdd}: Props) => {

    const initialValues = {name: "", link: ""};
    const [formValues, setFormValues] = useState<CardRequest>(initialValues);
    const [formErrors, setFormErrors] = useState<CardRequest>(initialValues);

    useEffect(() => {
        setFormValues(initialValues);
    }, [isOpen]);

    const handleChange = (e: any) => {
        const {name, value, validationMessage} = e.target;
        setFormErrors({...formErrors, [name]: validationMessage});
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = () => {
        return onCardAdd(formValues);
    };

    return (
        <PopupWithForm title="Новое место" name="add_place" buttonLabel="Создать"
                       onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit}
                       buttonDisabled={Object.values(formErrors).some((value: string) => value.length) ||
                       !Object.values(formValues).every((value: string) => value.length)}
        >
            <fieldset className="form__set">
                <Input title="Название:"
                       name="name"
                       minLength={2}
                       maxLength={30}
                       onChange={handleChange}
                       error={formErrors.name}
                       value={formValues.name}
                />
                <Input title="Ссылка на картинку:"
                       name="link"
                       type="url"
                       onChange={handleChange}
                       error={formErrors.link}
                       value={formValues.link}
                />
            </fieldset>
        </PopupWithForm>
    );
};