import * as React from 'react';
import {useEffect, useState} from 'react';
import ava from "../../images/ava.png";
import {api} from "../../utils/api";
import {CardModel} from "../../models/CardModel";
import {UserInfoModel} from "../../models/UserInfoModel";
import {Card} from "../Card/Card";

type Props = {
    onEditProfile: () => void,
    onAddPlace: () => void,
    onEditAvatar: () => void,
    onCardClick: (card: CardModel) => void,
};

export const Main = (props: Props) => {
    const [userInfo, setUserInfo] = useState<UserInfoModel>({
        name: 'Загрузка...',
        about: '',
        avatar: ava,
    });
    const [cards, setCards] = useState<CardModel[]>([]);
    useEffect(() => {
        api.getUserInfo()
            .then((userInfo: UserInfoModel) => {
                setUserInfo(userInfo);
            })
    }, []);

    useEffect(() => {
        api.getCards()
            .then((data) => {
                setCards([...cards, ...data]);
            })
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <img className="profile__avatar" src={userInfo.avatar} alt="Аватар пользователя"/>
                    <button className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar}
                            aria-label="Изменить аватар пользователя"/>
                    <div className="profile__info">
                        <h1 className="profile__title">{userInfo.name}</h1>
                        <button className="profile__edit-button" type="button" aria-label="изменить профиль"
                                onClick={props.onEditProfile}/>
                        <p className="profile__subtitle">{userInfo.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" aria-label="добавить фото"
                        onClick={props.onAddPlace}/>
            </section>
            <section className="places">
                {cards.reverse().map((card: CardModel) => {
                    return (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
                    )
                })}
            </section>
        </main>
    );
};