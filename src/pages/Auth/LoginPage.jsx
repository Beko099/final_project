import React, { useState } from 'react';
import './login.css'
import Close from '../../assets/Close';
import { NavLink, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {

    const navigate = useNavigate()

    const [valid, setValid] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let data = null
    const token = localStorage.getItem('token')

    console.log(token)

    async function handleLogin() {

        try {
            const response = await axios.post('http://16.16.205.229/api/v1/accounts/token/', {
                username: username,
                password: password,
            });
            const token = response.data.token; // Извлекаем токен из свойства `data` ответа
            localStorage.setItem('token', token);
        } catch (error) {
            console.error(error);
        }


        if (token !== null || token !== undefined) {
            navigate('/')
        } else {
        }

        setTimeout(() => {
            window.location.reload();
            
        }, 100)


    }





    return (
        <>
            <div className='login'>
                <div className="top">
                    <NavLink to="/">
                        <h1>ScreenSeeker</h1>
                    </NavLink>

                    <NavLink to="/">
                        <Close />
                    </NavLink>
                </div>

                <div className="login-container">
                    <h1>Вход на ScreenSeeker</h1>

                    {
                        username < 8 && username > 0 ? <p p style={{ color: 'red', fontSize: '12px', marginRight: '180px' }}>Слишком коротий ник</p> : null
                    }
                    {
                        username && username[0] !== username[0].toUpperCase() ? <p p style={{ color: 'red', fontSize: '12px', marginRight: '180px' }}>Ник должен начинаться с большой буквы</p> : null
                    }

                    {
                        username && /[.@+\-_?%]/.test(username) ? <p p style={{ color: 'red', fontSize: '12px', marginRight: '180px' }}>Недопустимые знаки</p> : null
                    }




                    <input type="text" className='input-text' placeholder='login' value={username} onChange={e => setUsername(e.target.value)} />

                    {
                        password < 8 && password > 0 ? <p p style={{ color: 'red', fontSize: '12px', marginRight: '180px' }}>Слишком короткий пароль</p> : null
                    }
                    {
                        password && password[0] !== password[0].toUpperCase() ? <p p style={{ color: 'red', fontSize: '12px', marginRight: '180px' }}>Пароль должен начинаться с большой буквы</p> : null
                    }
                    {

                        password && !/[.@+\-_%]/.test(password) ? (
                            <p style={{ color: 'red', fontSize: '12px', marginRight: '180px' }}>
                                Пароль должен содержать элементы @.+-_
                            </p>
                        ) : null
                    }
                    <input type="password" className='input-password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <NavLink to="/signup">
                        <p>Создать аккаунт</p>

                    </NavLink>

                    <button className='validation-button' onClick={handleLogin}>Войти</button>

                </div>
            </div>


        </>
    );
};

export default LoginPage;