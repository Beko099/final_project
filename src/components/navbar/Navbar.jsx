import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './navbar.css'
import { useSelector } from 'react-redux';

const Navbar = () => {

    const param = useSelector(state => state.movie.param)

    console.log(param)


        return (
            <>
                <div className="navbar">
                    <div className="bar-container">
                        <NavLink to="/movies/cartoons" style={{fontWeight: 500}}>Мультфульмы</NavLink>
                        <NavLink to="/movies/films" style={{fontWeight: 500}}>Фильмы</NavLink>
                    </div>
    
                </div>
    
            </>
        );

};

export default Navbar;