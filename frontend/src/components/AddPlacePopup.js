import PopupWithForm from "./PopupWithForm";
import React, {useEffect, useState} from "react";

function AddPlacePopup({isOpen, onClose, onUpdateCards}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen])

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateCards({
            name,
            link
        })
    }

    return (
        <PopupWithForm title='Новое место' name='add-card' titleBtn='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input
                name="namePic"
                id="card-name-input"
                className="popup__input-text popup__input-text_text_name"
                type="text"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
                value={name || ''}
                onChange={handleChangeName}
            />
            <span className="card-name-input-error popup__input-error"></span>

            <input
                name="linkPic"
                id="url-input"
                className="popup__input-text popup__input-text_text_link"
                type="url"
                placeholder="Ссылка на картинку"
                required
                value={link || ''}
                onChange={handleChangeLink}
            />
            <span className="url-input-error popup__input-error"></span>
            
            {/* <button className="popup__save-button" type="submit">Создать</button> */}
        </PopupWithForm>
    )
}

export default AddPlacePopup;