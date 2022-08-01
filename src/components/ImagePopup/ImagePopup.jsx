import * as React from 'react';
import {useCallback} from 'react';

export const ImagePopup = ({card, onClose}) => {
    const handleMouseDown = useCallback((event) => {
        if (event.target.classList.contains('popup_opened')
            || event.target.classList.contains('popup__close')) {
            onClose();
        }
    }, [onClose]);
    return (<div className={`popup popup_fullscreen ${card ? 'popup_opened' : ''}`} onMouseDown={handleMouseDown}>
        <figure className="popup__container popup__container_view_img">
            <button className="popup__close" type="button" title="закрыть" aria-label="закрыть"/>
            <img className="popup__img" src={card?.link ?? '#'} alt={card?.name}/>
            <figcaption className="popup__img-caption">{card?.name}</figcaption>
        </figure>
    </div>);
};
