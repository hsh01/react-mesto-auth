import React, {FunctionComponent} from 'react';
import {CardModel} from '../../models/CardModel';
import {Card} from '../Card';
import {Profile} from '../Profile';

type Props = {
    cards: CardModel[];
    onEditProfile: () => void;
    onAddPlace: () => void;
    onEditAvatar: () => void;
    handleCardClick: (card: CardModel) => void;
    onCardLike: (card: CardModel) => void;
    onCardRemove: (cardId: string) => void;
};

export const Main: FunctionComponent<Props> = ({
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    handleCardClick,
    onCardLike,
    onCardRemove
}) => {
    return (
        <main className='content'>
            <Profile onAddPlace={onAddPlace} onEditProfile={onEditProfile} onEditAvatar={onEditAvatar} />
            <section className='places'>
                {cards.map((card: CardModel) => {
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
