import React, {useCallback, useState} from 'react';
import './App.css';
import {Header} from "./Header/Header";
import {Main} from "./Main/Main";
import {Footer} from "./Footer/Footer";
import {PopupWithForm} from "./PopupWithForm/PopupWithForm";
import {ImagePopup} from "./ImagePopup/ImagePopup";
import {CardModel} from "../models/CardModel";

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState<boolean>(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState<boolean>(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState<boolean>(false);
    const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState<boolean>(false);

    const [selectedCard, setSelectedCard] = useState<CardModel>();


    const handleEditAvatarClick = useCallback(() => {
        setIsEditAvatarPopupOpen(prevState => !prevState);
    }, []);

    const handleEditProfileClick = useCallback(() => {
        setIsEditProfilePopupOpen(prevState => !prevState);
    }, []);

    const handleAddPlaceClick = useCallback(() => {
        setIsAddPlacePopupOpen(prevState => !prevState);
    }, []);

    const handleRemovePlaceClick = useCallback(() => {
        setIsRemovePlacePopupOpen(prevState => !prevState);
    }, []);

    const handleCardClick = useCallback((card: CardModel) => {
        setSelectedCard(card);
    }, []);

    const closeAllPopups = useCallback(() => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsRemovePlacePopupOpen(false);
        setSelectedCard(undefined);
    }, []);


    return (
        <>
            <Header/>
            <Main onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
            />
            <Footer/>
            {
                isEditAvatarPopupOpen &&
                <PopupWithForm title="Обновить аватар" name="edit_avatar" onClose={closeAllPopups}>
                    <fieldset className="form__set">
                        <label className="form__field">
                            <input className="form__input" name="avatar" type="url" required/>
                            <span
                                className="form__placeholder place-link-input-placeholder">Ссылка на аватар:</span>
                            <span className="form__input-error place-link-input-error"/>
                        </label>
                    </fieldset>
                    <button className="form__submit" type="submit">Сохранить</button>
                </PopupWithForm>
            }
            {
                isEditProfilePopupOpen &&
                <PopupWithForm title="Редактировать профиль" name="edit_profile" onClose={closeAllPopups}>
                    <fieldset className="form__set">
                        <label className="form__field">
                            <input className="form__input" name="name" type="text" minLength={2} maxLength={40}
                                   required/>
                            <span className="form__placeholder profile-name-input-placeholder">Имя:</span>
                            <span className="form__input-error profile-name-input-error"/>
                        </label>
                        <label className="form__field">
                            <input className="form__input" name="about" type="text" minLength={2} maxLength={200}
                                   required/>
                            <span className="form__placeholder profile-job-input-placeholder">О себе:</span>
                            <span className="form__input-error profile-job-input-error"/>
                        </label>
                    </fieldset>
                    <button className="form__submit" type="submit">Сохранить</button>
                </PopupWithForm>
            }
            {
                isAddPlacePopupOpen &&
                <PopupWithForm title="Новое место" name="add_place" onClose={closeAllPopups}>
                    <fieldset className="form__set">
                        <label className="form__field">
                            <input className="form__input" name="name" type="text" minLength={2} maxLength={30}
                                   required/>
                            <span className="form__placeholder place-name-input-placeholder">Название:</span>
                            <span className="form__input-error place-name-input-error"/>
                        </label>
                        <label className="form__field">
                            <input className="form__input" name="link" type="url" required/>
                            <span
                                className="form__placeholder place-link-input-placeholder">Ссылка на картинку:</span>
                            <span className="form__input-error place-link-input-error"/>
                        </label>
                    </fieldset>
                    <button className="form__submit" type="submit">Создать</button>
                </PopupWithForm>
            }
            {
                isRemovePlacePopupOpen &&
                <PopupWithForm title="Вы уверены?" name="remove_place" onClose={closeAllPopups}>
                    <input className="form__input" name="_id" type="hidden" required value=""/>
                    <button className="form__submit" type="submit">Да</button>
                </PopupWithForm>
            }
            {
                selectedCard &&
                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            }
        </>
    );
}

export default App;
