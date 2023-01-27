import logo from '../images/logo.svg';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';


function Header({loggedIn, setLoggedIn, email, headerText, signOut}) {
    const location = useHistory().location.pathname;

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип проекта Mesto" />
            <div className='header__right-items'>
                {loggedIn && <p className='header__text'>{email}</p>}
                {loggedIn  ? (<Link onClick={signOut} className="header__text" to="/sign-in">Выйти</Link>)
                        : 
                        (location === "/sign-in" 
                            ? <Link className="header__text" to="/sign-up">{headerText}</Link>
                            : <Link className="header__text" to="/sign-in">{headerText}</Link>)
                }
            </div>
        </header>
    )
}

export default Header;