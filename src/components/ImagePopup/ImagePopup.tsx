import * as React from 'react';
import {CardModel} from '../../models/CardModel';
import {Popup} from '../Popup';

type Props = {
    card: CardModel | null;
    onClose: () => void;
};

export const ImagePopup = ({card, onClose}: Props) => {
    return (
        <Popup isOpen={!!card} onClose={onClose} name='fullscreen' as='figure'>
            <>
                <button className='popup__close' type='button' title='закрыть' aria-label='закрыть' />
                <img className='popup__img' src={card?.link ?? '#'} alt={card?.name} />
                <figcaption className='popup__img-caption'>{card?.name}</figcaption>
            </>
        </Popup>
    );
};
