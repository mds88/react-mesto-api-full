import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Register({setHeaderText, onRegister}) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    useEffect(() => {
        setHeaderText('Войти');
    })

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePass(evt) {
        setPass(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onRegister({
            email,
            pass
        })
    }

    return (
        <div className="login">
            <h2 className="popup__title login__title">Регистрация</h2>
            <form className="popup__form" name="login" onSubmit={handleSubmit}>
                <input
                    name="email"
                    id="email-input"
                    className="popup__input-text login__input-text popup__input-text_text_email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email || ''}
                    onChange={handleChangeEmail}
                />
                {/* <span className="name-input-error popup__input-error">0</span> */}

                <input
                    name="pass"
                    id="pass-input"
                    className="popup__input-text login__input-text popup__input-text_text_pass"
                    type="password"
                    placeholder="Пароль"
                    required
                    value={pass || ''}
                    onChange={handleChangePass}
                />
                {/* <span className="about-self-input-error popup__input-error">0</span> */}

                <button className="popup__save-button login__submit" type="submit">Зарегистрироваться</button>
                <Link className="login__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}

export default Register;