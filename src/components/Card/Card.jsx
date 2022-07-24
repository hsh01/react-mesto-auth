import * as React from 'react';
import { CurrentUserContext } from "../../context/CurrentUserContext";
export const Card = ({ card, onCardClick, onCardLike, onCardRemove }) => {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `place__like ${isLiked ? 'place__like_active' : ''}`;
    function handleClick() {
        onCardClick(card);
    }
    return (<article className="place">
            <img className="place__image" src={card.link} alt={card.name} onClick={handleClick}/>
            <div className="place__list">
                <h2 className="place__title">{card.name}</h2>
                <div className="place__like-wrapper">
                    <button className={cardLikeButtonClassName} type="button" aria-label="лайк" onClick={() => onCardLike(card)}/>
                    <span className="place__like-counter">{card.likes.length}</span>
                </div>
            </div>
            {isOwn &&
            <button className="place__remove" type="button" aria-label="удалить" onClick={() => onCardRemove(card)}/>}
        </article>);
};
