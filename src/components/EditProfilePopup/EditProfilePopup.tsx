import * as React from 'react';
import {PopupWithForm} from "../PopupWithForm/PopupWithForm";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import {Input} from "../Input/Input";

type Props = {
    isOpen: boolean
    onClose: () => void,
    onUpdateUser: (user: { name: string; about: string }) => void,
};

export const EditProfilePopup = ({isOpen, onClose, onUpdateUser}: Props) => {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState<string>('');
    const [about, setAbout] = React.useState<string>('');

    function handleNameChange(e: any) {
        setName(e.target.value);
    }

    function handleAboutChange(e: any) {
        setAbout(e.target.value);
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        onUpdateUser({
            name,
            about
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser]);

    return (
        <PopupWithForm title="Редактировать профиль"
                       name="edit_profile"
                       onClose={onClose}
                       isOpen={isOpen}
                       onSubmit={handleSubmit}
        >
            <fieldset className="form__set">
                <Input title="Имя:" name="name" min={2} max={40} onChange={handleNameChange} />
                <Input title="О себ:" name="about" min={2} max={200} onChange={handleNameChange} />
            </fieldset>
        </PopupWithForm>
    );
};