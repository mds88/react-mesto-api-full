function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_active'}`} >
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__save-button" type="submit">{props.titleBtn}</button>
                </form>
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;