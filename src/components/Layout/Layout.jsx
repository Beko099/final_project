import React, { useRef, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './layout.css'
import Profile from '../../assets/ProfileLogo';
import Lupa from '../../assets/Lupa';
import Burger from '../../assets/Burger';
import Header from '../Header/Header';
import { Routes, Route, Link, useParams } from 'react-router-dom'


const Layout = ({type}) => {

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default Layout;