import React from 'react';
import {Card} from '../Card';
import {Profile} from '../Profile';
export const Main = ({cards, onEditProfile, onAddPlace, onEditAvatar, handleCardClick, onCardLike, onCardRemove}) => {
    return (
        <main className='content'>
            <Profile onAddPlace={onAddPlace} onEditProfile={onEditProfile} onEditAvatar={onEditAvatar} />
            <section className='places'>
                {cards.map((card) => {
                    return (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={handleCardClick}
                            onCardLike={onCardLike}
                            onCardRemove={onCardRemove}
                        />
                    );
                })}
            </section>
        </main>
    );
};
