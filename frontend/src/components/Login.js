import React, { useState, useEffect } from "react";

function Login({setHeaderText, onLogin}) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    useEffect(() => {
        setHeaderText('Регистрация');
    })    

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePass(evt) {
        setPass(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        if (!email || !pass) {
            return;
        }

        onLogin({
            email,
            pass
        })
    }

    return (
        <div className="login">
            <h2 className="popup__title login__title">Вход</h2>
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

                <button className="popup__save-button login__submit" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;