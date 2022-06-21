import * as React from 'react';
import {useCallback} from 'react';
import {CardModel} from "../../models/CardModel";

type Props = {
    card: CardModel | null,
    onClose: () => void,
};

export const ImagePopup = ({card, onClose}: Props) => {

    const handleMouseDown = useCallback((event: any) => {
        if (event.target.classList.contains('popup_opened')
            || event.target.classList.contains('popup__close')) {
            onClose();
        }
    }, []);

    return (
        card &&
        <div className="popup popup_fullscreen popup_opened" onMouseDown={handleMouseDown}>
            <figure className="popup__container popup__container_view_img">
                <button className="popup__close" type="button" title="закрыть" aria-label="закрыть"/>
                <img className="popup__img" src={card.link} alt={card.name}/>
                <figcaption className="popup__img-caption">{card.name}</figcaption>
            </figure>
        </div>
    );
};