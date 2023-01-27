function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_image ${card.link && 'popup_active'}`}>
            <div className="popup__container popup__container_image">
                <img 
                    className="popup__image" 
                    src={card.link} 
                    alt={`Фото ${card.name}`}
                />
                <p className="popup__text">{card.name}</p>
                <button className="popup__close-button" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;