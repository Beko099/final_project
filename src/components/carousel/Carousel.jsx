import React, { useRef } from 'react';
import './carousel.css'
import Favorite from '../../assets/Favorite';
import { NavLink, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


function CarouselSlide({ id = 1, img = 'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/x1000', rating = 0 }) {

    return (
        <>
            <div className='carousel-img-container'>
                <img src={img} alt="" className='carousel-img' />
                <div className="rating" >{rating}</div>
                <NavLink to={`/aboutpage/${id}`} className='link'>
                </NavLink>

{/* 
                <button className='button-favorite-radius'>
                    <Favorite />
                </button> */}
            </div>

        </>
    )
}

const Carousel = ({type, category}) => {

    const error = useSelector(state => state.movie.error)


    if (type !== null ) {
        return (
            <>
                <div className='carousel-container' >
                    {
                        type.results.map((carousel, index) => (
                            <CarouselSlide
                                key={index}
                                img={carousel.poster}
                                rating={carousel.rating}
                                id={carousel.id}
                            />
                        ))
                    }
                </div>
            </>
        );
    } else if (Boolean(error)) {
        return <div style={{
          textAlign: 'center',
          fontSize: '44px',
          margin: '100px 0 100px 0',
        }}>Извините, но у нас технические проблемы, пожалуйста зайдите в другое время</div>;
      } else {
      }
};

export default Carousel;