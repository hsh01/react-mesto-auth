import * as React from 'react';
import {useEffect, useState} from 'react';
import {PopupWithForm} from '../PopupWithForm';
export const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
    const inputRef = React.useRef(null);
    const [fixed, setFixed] = useState(false);
    const [error, setError] = useState('');
    function handleSubmit() {
        return onUpdateAvatar({
            avatar: inputRef.current.value
        });
    }
    useEffect(() => {
        inputRef.current.value = '';
        setFixed(false);
        setError('');
    }, [isOpen]);
    return (
        <PopupWithForm
            title='Обновить аватар'
            name='edit_avatar'
            onClose={onClose}
            isOpen={isOpen}
            buttonDisabled={!!error.length}
            onSubmit={handleSubmit}
        >
            <fieldset className='form__set'>
                <label className='form__field'>
                    <input
                        className={`form__input${error ? ' form__input_type_error' : ''}`}
                        name='avatar'
                        type='url'
                        required={true}
                        ref={inputRef}
                    />
                    <span className={`form__placeholder${fixed ? ' form__placeholder_is-fixed' : ''}`}>
                        Ссылка на аватар:
                    </span>
                    <span
                        className={`form__input-error ${
                            inputRef.current && inputRef.current.validity.valid ? 'form__input-error_active' : ''
                        }`}
                    >
                        {inputRef.current && inputRef.current.validationMessage}
                    </span>
                </label>
            </fieldset>
        </PopupWithForm>
    );
};
