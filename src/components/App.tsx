import React, {useCallback, useState} from 'react';
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

    const [selectedCard, setSelectedCard] = useState<CardModel | null>(null);


    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleRemovePlaceClick = () => {
        setIsRemovePlacePopupOpen(true);
    }

    const handleCardClick = (card: CardModel) => {
        setSelectedCard(card);
    }

    const closeAllPopups = useCallback(() => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsRemovePlacePopupOpen(false);
        setSelectedCard(null);
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
            <PopupWithForm title="Обновить аватар" name="edit_avatar" onClose={closeAllPopups}
                           isOpen={isEditAvatarPopupOpen}>
                <fieldset className="form__set">
                    <label className="form__field">
                        <input className="form__input" name="avatar" type="url" required/>
                        <span
                            className="form__placeholder place-link-input-placeholder">Ссылка на аватар:</span>
                        <span className="form__input-error place-link-input-error"/>
                    </label>
                </fieldset>
            </PopupWithForm>
            <PopupWithForm title="Редактировать профиль" name="edit_profile"
                           onClose={closeAllPopups} isOpen={isEditProfilePopupOpen}>
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
            </PopupWithForm>
            <PopupWithForm title="Новое место" name="add_place" buttonLabel="Создать"
                           onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}>
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
            </PopupWithForm>
            <PopupWithForm title="Вы уверены?" name="remove_place" onClose={closeAllPopups}
                           buttonLabel="Да" isOpen={isRemovePlacePopupOpen}>
                <input className="form__input" name="_id" type="hidden" required value=""/>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </>
    );
}

export default App;
