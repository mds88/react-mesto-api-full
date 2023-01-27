import React, {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    
    return (
        <main className="content">
            <section className="profile">
                <button className="profile__edit-avatar" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" alt="Аватар" src={currentUser.avatar} />
                    <div className="profile__edit-icon"></div>
                </button>
                <div className="profile__profile-info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-profile" type="button" onClick={props.onEditProfile}></button>
                    <p className="profile__about-self">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                <ul className="elements-list">
                    {props.cards.map((item, i) => (
                        <Card 
                            card={item}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                            key={item._id}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;