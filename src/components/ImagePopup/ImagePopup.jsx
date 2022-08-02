import * as React from 'react';
import {Popup} from '../Popup';
export const ImagePopup = ({card, onClose}) => {
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
