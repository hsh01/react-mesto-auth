import * as React from 'react';
import {PopupWithForm} from '../PopupWithForm';

type Props = {
    cardId?: string;
    isOpen: boolean;
    onClose: () => void;
    onCardRemove: (card: string) => void;
};

export const RemovePlacePopup = ({cardId, isOpen, onClose, onCardRemove}: Props) => {
    const handleSubmit = () => {
        return onCardRemove(cardId!);
    };

    return (
        <PopupWithForm
            title='Вы уверены?'
            name='remove_place'
            onClose={onClose}
            buttonLabel='Да'
            isOpen={isOpen}
            onSubmit={handleSubmit}
            buttonDisabled={false}
        >
            <input className='form__input' name='_id' type='hidden' required value={cardId ?? ''} />
        </PopupWithForm>
    );
};
