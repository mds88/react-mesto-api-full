import React, {useContext, useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setAbout] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeAbout(evt) {
        setAbout(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name,
            about: description
        })
    }

    return (
        <PopupWithForm title='Редактировать профиль' name='edit-profile' titleBtn='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input 
                name="name"
                id="name-input"
                className="popup__input-text popup__input-text_text_name"
                type="text"
                placeholder="Ваше имя"
                required
                minLength="2"
                maxLength="40"
                value={name || ''}
                onChange={handleChangeName}
            />
            <span className="name-input-error popup__input-error" />

            <input 
                name="about"
                id="about-self-input"
                className="popup__input-text popup__input-text_text_about-self"
                type="text"
                placeholder="О себе"
                required minLength="2"
                maxLength="200"
                value={description || ''}
                onChange={handleChangeAbout}
            />
            <span className="about-self-input-error popup__input-error"></span>
            
            {/* <button className="popup__save-button" type="submit">Сохранить</button> */}
        </PopupWithForm>
    )
}

export default EditProfilePopup;