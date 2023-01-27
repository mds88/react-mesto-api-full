import logoAccess from '../images/UnionAccess.svg';
import logoError from '../images/UnionError.svg';

function InfoTooltip({isOpen, onClose, dataPopup}) {
    return (
        <div className={`popup ${isOpen && 'popup_active'}`}>
            <div className="popup__container">
                <img 
                    className="popup__image popup__image_infotooltip" 
                    alt="errorPopup"
                    src = {dataPopup.logo === "error" ? logoError : logoAccess}   
                />
                <p className="popup__text popup__text_infotooltip">{dataPopup.text}</p> 
                <button className="popup__close-button" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;