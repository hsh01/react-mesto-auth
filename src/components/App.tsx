import React, {useCallback, useEffect, useState} from 'react';
import {Header} from "./Header/Header";
import {Main} from "./Main/Main";
import {Footer} from "./Footer/Footer";
import {PopupWithForm} from "./PopupWithForm/PopupWithForm";
import {ImagePopup} from "./ImagePopup/ImagePopup";
import {CardModel} from "../models/CardModel";
import {api} from "../utils/api";
import {UserInfoModel} from "../models/UserInfoModel";
import {CurrentUserContext} from '../context/CurrentUserContext';
// @ts-ignore
import ava from "../images/ava.png";
import {EditProfilePopup} from "./EditProfilePopup/EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup/EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup/AddPlacePopup";

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState<boolean>(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState<boolean>(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState<boolean>(false);
    const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState<boolean>(false);

    const [selectedCard, setSelectedCard] = useState<CardModel | null>(null);
    const [currentUser, setCurrentUser] = useState<UserInfoModel>({
        name: 'Загрузка...',
        about: '',
        avatar: ava,
    });


    const [cards, setCards] = useState<CardModel[]>([]);

    useEffect(() => {
        api.getCards()
            .then((data) => {
                setCards([...cards, ...data]);
            })
    }, []);

    function handleCardLike(card: CardModel) {
        const isLiked = card.likes!.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleCardRemove(card: CardModel) {
        api.deleteCard(card._id!).then(r => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        });
    }

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

    const handleUpdateUser = (user: { name: string | undefined; about: string | undefined }) => {
        api.patchUserInfo(user)
            .then(user => setCurrentUser(user))
            .then(() => setIsEditProfilePopupOpen(false));
    }

    const handleUpdateAvatar = (user: { avatar: string }) => {
        api.patchUserAvatar(user)
            .then(user => setCurrentUser(user))
            .then(() => setIsEditAvatarPopupOpen(false));
    }

    const handleAddPlaceSubmit = (card: CardModel) => {
        api.postCard(card)
            .then(card => setCards([card, ...cards]))
            .then(() => setIsAddPlacePopupOpen(false));
    }

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
            .then((user: UserInfoModel) => {
                setCurrentUser(user);
            });
    }, []);


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header/>
            <Main onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  handleCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardRemove={handleCardRemove}
            />
            <Footer/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                             onUpdateAvatar={handleUpdateAvatar}/>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCardAdd={handleAddPlaceSubmit}/>
            <PopupWithForm title="Вы уверены?" name="remove_place" onClose={closeAllPopups}
                           buttonLabel="Да" isOpen={isRemovePlacePopupOpen}>
                <input className="form__input" name="_id" type="hidden" required value=""/>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </CurrentUserContext.Provider>
    );
}

export default App;
