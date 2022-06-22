import * as React from 'react';
import { useEffect, useState } from 'react';
// @ts-ignore
import ava from "../../images/ava.png";
import { api } from "../../utils/api";
import { Card } from "../Card/Card";
export const Main = (props) => {
    const [userInfo, setUserInfo] = useState({
        name: 'Загрузка...',
        about: '',
        avatar: ava,
    });
    const [cards, setCards] = useState([]);
    useEffect(() => {
        api.getUserInfo()
            .then((userInfo) => {
            setUserInfo(userInfo);
        });
    }, []);
    useEffect(() => {
        api.getCards()
            .then((data) => {
            setCards([...cards, ...data]);
        });
    }, []);
    return (<main className="content">
            <section className="profile">
                <div className="profile__container">
                    <img className="profile__avatar" src={userInfo.avatar} alt="Аватар пользователя"/>
                    <button className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar} aria-label="Изменить аватар пользователя"/>
                    <div className="profile__info">
                        <h1 className="profile__title">{userInfo.name}</h1>
                        <button className="profile__edit-button" type="button" aria-label="изменить профиль" onClick={props.onEditProfile}/>
                        <p className="profile__subtitle">{userInfo.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" aria-label="добавить фото" onClick={props.onAddPlace}/>
            </section>
            <section className="places">
                {cards.reverse().map((card) => {
            return (<Card key={card._id} card={card} onCardClick={props.onCardClick}/>);
        })}
            </section>
        </main>);
};
