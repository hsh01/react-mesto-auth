import * as React from 'react';
import {CardModel} from "../../models/CardModel";
import {PopupWithForm} from "../PopupWithForm/PopupWithForm";
import {Input} from "../Input/Input";

type Props = {
    isOpen: boolean
    onClose: () => void,
    onCardAdd: (card: CardModel) => void,
};

export const AddPlacePopup = ({isOpen, onClose, onCardAdd}: Props) => {

    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");


    function handleSubmit(e: any) {
        e.preventDefault();
        onCardAdd({name, link});
    }

    return (
        <PopupWithForm title="Новое место" name="add_place" buttonLabel="Создать"
                       onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit}>
            <fieldset className="form__set">
                <Input title="Название:" name="name" min={2} max={30} onChange={(e) => setName(e.target.value)}/>
                <Input title="Ссылка на картинку:" name="link" type="url" onChange={(e) => setLink(e.target.value)}/>
            </fieldset>
        </PopupWithForm>
    );
};