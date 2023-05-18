import React from 'react';
import './sign.css'
import Close from '../../assets/Close';
import { NavLink, Outlet, useActionData, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const SignUpPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [token, setToken] = useState('');
    const navigate = useNavigate()


    // function handleUsername(e) {
    //     setLogin(e.target.value)
    // }

    // function handlePassword(e) {
    //     setPassword(e.target.value)
    // }

    async function handleSign() {
        try {
            const response = await axios.post('http://16.16.205.229/api/v1/accounts/register/', {
                username: username,
                password: password,
                password_check: rePassword,
            });

            const token = response.data.token; // Извлекаем токен из свойства `data` ответа
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <div className='sign'>
            <div className="top">
                <NavLink to="/">
                    <h1>ScreenSeeker</h1>
                </NavLink>

                <NavLink to="/">
                    <Close />
                </NavLink>
            </div>

            <div className="registration-container">
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





                <input type="text" className='input-text' placeholder='login' onChange={e => setUsername(e.target.value)} value={username} />

                {
                    password < 8 && password > 1 ? <p p style={{ color: 'red', fontSize: '12px', marginRight: '180px' }}>Слишком короткий пароль</p> : null
                }
                {
                    password && password[0] !== password[0].toUpperCase() ? <p p style={{ color: 'red', fontSize: '12px', marginRight: '180px' }}>Пароль должен начинаться с большой буквы</p> : null
                }
                {
                    password && !/[.@+\-_?%]/.test(password) ? (
                        <p style={{ color: 'red', fontSize: '12px', marginRight: '180px' }}>
                            Пароль должен содержать элементы @.+-_
                        </p>
                    ) : null
                }

                <input type="password" className='input-password' placeholder='password' onChange={e => setPassword(e.target.value)} value={password} />
                {
                    password !== rePassword ? <p style={{ color: 'red', fontSize: '12px', marginRight: '180px' }}>Пароли должны быть одинаковыми</p> : null
                }
                <input type="password" className='input-password' placeholder='re-password' onChange={e => setRePassword(e.target.value)} value={rePassword} />

                <NavLink to="/login">
                    <p>У меня есть аккаунт</p>

                </NavLink>

                <button className='validation-button' onClick={handleSign}>Создать</button>
            </div>
        </div >
    );
};

export default SignUpPage;