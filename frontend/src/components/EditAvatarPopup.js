import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const linkRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar(linkRef.current.value);
    }

    return (
        <PopupWithForm title='Обновить аватар' name='edit-avatar' titleBtn='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input
                name="linkPicAvatar"
                id="url-input-avatar"
                className="popup__input-text popup__input-text_text_link"
                type="url"
                placeholder="Ссылка на аватар"
                required
                ref={linkRef}
            />
            <span className="url-input-avatar-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;