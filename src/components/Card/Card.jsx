import * as React from 'react';
export const Card = ({ card, onCardClick }) => {
    function handleClick() {
        onCardClick(card);
    }
    return (<article className="place">
            <img className="place__image" src={card.link} alt={card.name} onClick={handleClick}/>
            <div className="place__list">
                <h2 className="place__title">{card.name}</h2>
                <div className="place__like-wrapper">
                    <button className="place__like" type="button" aria-label="лайк"/>
                    <span className="place__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </article>);
};
