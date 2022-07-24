import * as React from 'react';
import { Card } from "../Card/Card";
import { CurrentUserContext } from "../../context/CurrentUserContext";
export const Main = (props) => {
    const currentUser = React.useContext(CurrentUserContext);
    return (<main className="content">
            <section className="profile">
                <div className="profile__container">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя"/>
                    <button className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar} aria-label="Изменить аватар пользователя"/>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" aria-label="изменить профиль" onClick={props.onEditProfile}/>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" aria-label="добавить фото" onClick={props.onAddPlace}/>
            </section>
            <section className="places">
                {props.cards.map((card) => {
            return (<Card key={card._id} card={card} onCardClick={props.handleCardClick} onCardLike={props.onCardLike} onCardRemove={props.onCardRemove}/>);
        })}
            </section>
        </main>);
};