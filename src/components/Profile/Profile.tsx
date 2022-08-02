import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

type Props = {
    onAddPlace: () => void;
    onEditProfile: () => void;
    onEditAvatar: () => void;
};

export const Profile = ({onEditProfile, onAddPlace, onEditAvatar}: Props) => {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <section className='profile'>
            <div className='profile__container'>
                <img className='profile__avatar' src={currentUser.avatar} alt='Аватар пользователя' />
                <button
                    className='profile__avatar-edit-button'
                    type='button'
                    onClick={onEditAvatar}
                    aria-label='Изменить аватар пользователя'
                />
                <div className='profile__info'>
                    <h1 className='profile__title'>{currentUser.name}</h1>
                    <button className='profile__edit-button' type='button' aria-label='изменить профиль' onClick={onEditProfile} />
                    <p className='profile__subtitle'>{currentUser.about}</p>
                </div>
            </div>
            <button className='profile__add-button' type='button' aria-label='добавить фото' onClick={onAddPlace} />
        </section>
    );
};
