import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Profile from '../../assets/ProfileLogo';
import Lupa from '../../assets/Lupa';
import Burger from '../../assets/Burger';
import './header.css'
import { setFocus } from '../../store/searchSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Navbar from '../navbar/Navbar';
import { setSearch } from '../../store/movieSlice';

const Header = () => {

    const token = localStorage.getItem('token')
    useEffect(() => {
        
    }, [token])

    console.log(token)

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const searchFocus = useSelector(state => state.search.focus)
    const search = useSelector(state => state.movie.search)
    const [input, setInput] = useState('')
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(setSearch(input));
    }, [input, dispatch]);


    const searchData = useSelector(state => state.movie.search)

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    console.log(search)

    const navigate = useNavigate()
    const [profile, setProfile] = useState(0)
    function handleLogout() {
        localStorage.removeItem('token');

        setTimeout(() => {
            window.location.reload();
        }, 500)
    }



    return (
        <header style={

            searchFocus === true ? { position: 'fixed' } : null
        }>
            <div className='home' >
                <div className="left-side" >
                    <NavLink to="/" className='link'>
                        <h1>ScreenSeeker</h1>
                    </NavLink>
                </div>
            </div>

            <div className="catalog">

                {
                    screenWidth > 900 ?
                        <>
                            <NavLink to="/movies/cartoons" style={{fontWeight: 500}}>Мультфильмы</NavLink>
                            <NavLink to="/movies/films" style={{fontWeight: 500}}>Фильмы</NavLink>
                        </> :
                        <>

                        </>
                }

                <input
                    type="text"
                    className="search"
                    onFocus={() => dispatch(setFocus(true))}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    value={input}
                    placeholder="найти"
                    onBlur={() => {
                        setTimeout(() => {
                            dispatch(setFocus(false));
                        }, 100); // Задержка в 500 миллисекунд (0.5 секунды)
                    }}
                />

                {/* <Lupa /> */}

            </div>

            {
                token === null ? <div className="account">
                    {/* <Profile /> */}
                    <NavLink to="/login">
                        <button className='button-account'>Войти</button>
                    </NavLink>
                </div>
                    :
                    <div className="container-profile" style={{ position: 'relative', }}>
                        <p style={{ fontWeight: '700', cursor: 'pointer', padding: '0 0 0 40px', color: 'purple' }} onClick={() => setProfile(profile + 1)}>PROFILE</p>
                        {
                            profile % 2 ? <div className="text-profile" style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'absolute', zIndex: '2', backgroundColor: '#141414', width: '300px', padding: '0 0 0 30px', fontWeight: '700' }}>
                                <p onClick={() => navigate('/message-profile')}>COMMENTS</p>
                                <p onClick={() => navigate('/profile')}>PROFILE</p>
                                <p onClick={handleLogout}>LOG OUT</p>
                            </div>
                                : null
                        }
                    </div> 

            } 

        </header>
    );
};

export default Header;