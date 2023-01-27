import React, {useContext} from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id || typeof props.card.owner._id === 'undefined';
    const isLiked = props.card.likes.some(el => el._id === currentUser._id);

    const cardElementDelClassName = (
        `element__del ${isOwn ? 'element__del_visible' : ''}`
    );

    const cardElementLikeClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
    <li className="element" >
        <button className={cardElementDelClassName} onClick={handleDeleteClick} type="button"></button>
        <img
            onClick={handleClick}
            className="element__image" 
            alt={`Фото ${props.card.name}`}
            src={props.card.link}
        />
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-group">
            <button className={cardElementLikeClassName} onClick={handleLikeClick} type="button"></button>
            <p className="element__like-count">{props.card.likes.length}</p>
        </div>
    </li>
    )
}

export default Card;