import React, { useEffect, useState } from 'react';
import './footer.css'
import Facebook from '../../assets/Facebook';
import Twitter from '../../assets/Twitter';
import Vk from '../../assets/Vk';
import Telegram from '../../assets/Telegram';



const Footer = () => {

    return (
        <>
        <footer >
            <p>Этот сайт создан для ознакомотиленьго опыта, вы также можете делиться мнением о фильмах</p>
            <div className="messangers">
                <Facebook />
                <Twitter />
                <Vk />
                <Telegram />
            </div>

            <div className="footer-bottom">
                <h1>©2023, ScreenSeeker </h1>
                <h1>ScreenSeeker</h1>
                <h1>Проект компании Tesla</h1>
            </div>

        </footer>
        </>
    );
};

export default Footer;