import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { AddPlacePopup } from '../../components/AddPlacePopup';
import { Footer } from '../../components/Footer';
import { EditProfilePopup } from '../../components/EditProfilePopup';
import { api } from '../../utils/api';
import { EditAvatarPopup } from '../../components/EditAvatarPopup';
import { ImagePopup } from '../../components/ImagePopup';
import { Main } from '../../components/Main';
import { RemovePlacePopup } from '../../components/RemovePlacePopup';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Router } from '../../router';
function Home() {
    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [removeCard, setRemoveCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({
        name: 'Загрузка...',
        about: '',
        avatar: require('../../images/ava.png')
    });
    const [cards, setCards] = useState([]);
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };
    const handleRemovePlaceClick = (cardId) => {
        setRemoveCard(cardId);
        setIsRemovePlacePopupOpen(true);
    };
    const closeAllPopups = useCallback(() => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsRemovePlacePopupOpen(false);
        setSelectedCard(null);
    }, []);
    const handleCardClick = (card) => {
        setSelectedCard(card);
    };
    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
            .catch((err) => console.log(err));
    }
    function handleCardRemove(cardId) {
        return api.deleteCard(cardId).then(() => {
            setCards((state) => state.filter((c) => c._id !== cardId));
        }, (err) => {
            console.log(err);
        });
    }
    const handleAddPlaceSubmit = (card) => {
        return api.postCard(card).then((card) => setCards([card, ...cards]), (err) => {
            console.log(err);
        });
    };
    const handleUpdateUser = (user) => {
        return api.patchUserInfo(user).then((user) => setCurrentUser(user), (err) => {
            console.log(err);
        });
    };
    const handleUpdateAvatar = (user) => {
        return api.patchUserAvatar(user).then((user) => setCurrentUser(user), (err) => {
            console.log(err);
        });
    };
    function signOut() {
        localStorage.removeItem('jwt');
        navigate(Router.LOGIN, { replace: true });
    }
    useEffect(() => {
        Promise.all([
            api.getUserInfo().then((user) => {
                setCurrentUser(user);
            }),
            api.getCards().then(setCards)
        ]).catch((err) => console.log(err));
    }, []);
    return (<CurrentUserContext.Provider value={currentUser}>
            <Header menu={appContext.userData?.email && (<>
                            <p className='header__menu-item'>{appContext.userData?.email}</p>
                            <button className='header__signout' onClick={signOut}>
                                Выйти
                            </button>
                        </>)}/>
            <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} handleCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardRemove={handleRemovePlaceClick}/>
            <Footer />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCardAdd={handleAddPlaceSubmit}/>
            <RemovePlacePopup isOpen={isRemovePlacePopupOpen} onClose={closeAllPopups} onCardRemove={handleCardRemove} cardId={removeCard}/>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </CurrentUserContext.Provider>);
}
export { Home };
