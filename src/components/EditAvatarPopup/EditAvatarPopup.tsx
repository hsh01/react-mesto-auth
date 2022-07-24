import * as React from 'react';
import {PopupWithForm} from "../PopupWithForm/PopupWithForm";

type Props = {
    isOpen: boolean
    onClose: () => void,
    onUpdateAvatar: (user: { avatar: string }) => void,
};

export const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}: Props) => {
    const inputRef = React.useRef<any>();

    function handleSubmit(e: any) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value
        });
    }

    return (
        <PopupWithForm title="Обновить аватар" name="edit_avatar" onClose={onClose} isOpen={isOpen}
                       onSubmit={handleSubmit}>
            <fieldset className="form__set">
                <label className="form__field">
                    <input className="form__input"
                           name="avatar"
                           type="url"
                           required
                           ref={inputRef}
                    />
                    <span
                        className="form__placeholder place-link-input-placeholder">Ссылка на аватар:</span>
                    <span className="form__input-error place-link-input-error"/>
                </label>
            </fieldset>
        </PopupWithForm>
    );
};