import React, { useCallback, useEffect, useState } from 'react';
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Footer } from "./Footer/Footer";
import { PopupWithForm } from "./PopupWithForm/PopupWithForm";
import { ImagePopup } from "./ImagePopup/ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from '../context/CurrentUserContext';
// @ts-ignore
import ava from "../images/ava.png";
import { EditProfilePopup } from "./EditProfilePopup/EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup/EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup/AddPlacePopup";
function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({
        name: 'Загрузка...',
        about: '',
        avatar: ava,
    });
    const [cards, setCards] = useState([]);
    useEffect(() => {
        api.getCards()
            .then((data) => {
            setCards([...cards, ...data]);
        });
    }, []);
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }
    function handleCardRemove(card) {
        api.deleteCard(card._id).then(r => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        });
    }
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };
    const handleRemovePlaceClick = () => {
        setIsRemovePlacePopupOpen(true);
    };
    const handleCardClick = (card) => {
        setSelectedCard(card);
    };
    const handleUpdateUser = (user) => {
        api.patchUserInfo(user)
            .then(user => setCurrentUser(user))
            .then(() => setIsEditProfilePopupOpen(false));
    };
    const handleUpdateAvatar = (user) => {
        api.patchUserAvatar(user)
            .then(user => setCurrentUser(user))
            .then(() => setIsEditAvatarPopupOpen(false));
    };
    const handleAddPlaceSubmit = (card) => {
        api.postCard(card)
            .then(card => setCards([card, ...cards]))
            .then(() => setIsAddPlacePopupOpen(false));
    };
    const closeAllPopups = useCallback(() => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsRemovePlacePopupOpen(false);
        setSelectedCard(null);
    }, []);
    useEffect(() => {
        document.title = 'Mesto';
        api.getUserInfo()
            .then((user) => {
            setCurrentUser(user);
        });
    }, []);
    return (<CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} handleCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardRemove={handleCardRemove}/>
            <Footer />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCardAdd={handleAddPlaceSubmit}/>
            <PopupWithForm title="Вы уверены?" name="remove_place" onClose={closeAllPopups} buttonLabel="Да" isOpen={isRemovePlacePopupOpen}>
                <input className="form__input" name="_id" type="hidden" required value=""/>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </CurrentUserContext.Provider>);
}
export default App;
