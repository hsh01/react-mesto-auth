import {useCallback, useEffect, useState} from 'react';
import {Header} from "./Header";
import {Main} from "./Main";
import {Footer} from "./Footer";
import {ImagePopup} from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from '../context/CurrentUserContext';
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {RemovePlacePopup} from "./RemovePlacePopup";
// @ts-ignore
import ava from "../images/ava.png";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState(false);
    const [removeCard, setRemoveCard] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({
        name: 'Загрузка...',
        about: '',
        avatar: ava,
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
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => console.log(err));
    }

    function handleCardRemove(cardId) {
        return api.deleteCard(cardId).then(() => {
            setCards((state) => state.filter((c) => c._id !== cardId));
        });
    }


    const handleAddPlaceSubmit = (card) => {
        return api.postCard(card).then(
            card => setCards([card, ...cards]),
            (err) => {
                console.log(err);
            });
    };
    const handleUpdateUser = (user) => {
        return api.patchUserInfo(user).then(
            user => setCurrentUser(user),
            (err) => {
                console.log(err);
            });
    };
    const handleUpdateAvatar = (user) => {
        return api.patchUserAvatar(user).then(
            user => setCurrentUser(user),
            (err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        document.title = 'Mesto';
        Promise.all([
            api.getUserInfo()
                .then((user) => {
                    setCurrentUser(user);
                }),
            api.getCards()
                .then((data) => {
                    setCards([...cards, ...data]);
                })
        ]).catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.code === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, []);
    return (<CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick} handleCardClick={handleCardClick} cards={cards}
              onCardLike={handleCardLike} onCardRemove={handleRemovePlaceClick}/>
        <Footer/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCardAdd={handleAddPlaceSubmit}/>
        <RemovePlacePopup isOpen={isRemovePlacePopupOpen} onClose={closeAllPopups} onCardRemove={handleCardRemove}
                          cardId={removeCard}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </CurrentUserContext.Provider>);
}

export default App;
