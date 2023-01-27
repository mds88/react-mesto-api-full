import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React, { useState, useEffect } from 'react';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Switch, Route, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as mestoAuth from '../utils/mestoAuth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipData, setInfoTooltipData] = useState({});
  const [emailInfo, setEmailInfo] = useState('');
  const [headerText, setHeaderText] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      setUserInfo();
    }
  }, [loggedIn])

  function setUserInfo() {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setCurrentUser(userData.user);
      setCards(cards.cards);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
      mestoAuth.getToken()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmailInfo(res.user.email);
            history.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        })
  }, [loggedIn, history])

  function handleCardLike(card) {
    const isLiked = card.likes.some(el => el._id === currentUser._id);

    api.setLike(isLiked, card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.card : c));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api.delCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardClick(Card) {
    setSelectedCard(Card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(data) {
    api.setProfileInfo(data)
      .then((userData) => {
        setCurrentUser(userData.user);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleUpdateAvatar(linkAvatar) {
    api.setAvatar(linkAvatar)
      .then((userData) => {
        setCurrentUser(userData.user);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleUpdateCards(newCard) {
    api.addCard(newCard)
      .then((card) => {
        setCards([card.card, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function onLogin(loginData) {
    mestoAuth.login(loginData.email, loginData.pass)
      .then((answer) => {
        setLoggedIn(true);
        setUserInfo();
        history.push("/");
      })
      .catch((error) => {
        setInfoTooltipData({
          text: "Что-то пошло не так! Попробуйте еще раз. ",
          logo: "error"
        })
        setIsInfoTooltipOpen(true);
      })
  }

  function onRegister(regData) {
    mestoAuth.registr(regData.email, regData.pass)
      .then((answer) => {
        setInfoTooltipData({
          text: "Вы успешно зарегистрировались!",
          logo: "access"
        })
        setIsInfoTooltipOpen(true);
      })
      .catch((error) => {
        setInfoTooltipData({
          text: "Что-то пошло не так! Попробуйте еще раз. ",
          logo: "error"
        })
        setIsInfoTooltipOpen(true);
      })
  }

  function unLogin() {
    mestoAuth.unLogin()
      .then((answer) => {
        setLoggedIn(false);
        setEmailInfo('');
      })
      .catch((error) => {
        setInfoTooltipData({
          text: "Что-то пошло не так! Попробуйте еще раз.",
          logo: "error"
        })
        setIsInfoTooltipOpen(true);
      })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} email={emailInfo} headerText={headerText} signOut={unLogin} />

        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-up">
            <Register setHeaderText={setHeaderText} onRegister={onRegister} />
          </Route>
          <Route path="/sign-in">
            <Login setHeaderText={setHeaderText} onLogin={onLogin} />
          </Route>
        </Switch>

        {loggedIn && <Footer />}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateCards={handleUpdateCards} />
        <PopupWithForm title='Вы уверены?' name='confirm-delete' />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} dataPopup={infoTooltipData} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
