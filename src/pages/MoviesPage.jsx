import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom'
import Carousel from '../components/carousel/Carousel';
import Slider from '../components/slider/slider';
import Footer from '../components/Footer/Footer';
import { useDispatch } from 'react-redux';
// import { horrorData, familyData } from './Data';
// import { fetchHorrorData } from '../store/movieSlice';
import { useSelector } from 'react-redux';
import { fetchData } from '../store/MovieActions';
import { setLoading, setError, setTopInfo, setSlider, setTopChart, setTopRating } from '../store/movieSlice';

const MoviesPage = () => {

    let { category } = useParams()


    const topInfo = useSelector(state => state.movie.topInfo);
    const rating = useSelector(state => state.movie.rating);
    const slider = useSelector(state => state.movie.slider);
    const chart = useSelector(state => state.movie.chart);
    const top = useSelector(state => state.movie.top);
    const loading = useSelector(state => state.movie.loading);
    const error = useSelector(state => state.movie.error);
    const dispatch = useDispatch();

    let sliderCartoon = 'http://16.16.205.229/api/v1/app/filmworks/firstslider/?type=cartoon&limit=10'
    let ratingCartoon = 'http://16.16.205.229/api/v1/app/filmworks/otherslider/?type=cartoon&limit=10&offset=10'
    let chartCartoon = 'http://16.16.205.229/api/v1/app/filmworks/otherslider/?type=cartoon&limit=10&offset=20'
    let topCartoon = 'http://16.16.205.229/api/v1/app/filmworks/otherslider/?type=cartoon&limit=10&offset=30'

    let sliderMovie = 'http://16.16.205.229/api/v1/app/filmworks/firstslider/?type=movie&limit=10'
    let ratingMovie = 'http://16.16.205.229/api/v1/app/filmworks/otherslider/?type=movie&limit=10&offset=30'
    let chartMovie = 'http://16.16.205.229/api/v1/app/filmworks/otherslider/?type=movie&limit=10&offset=40'
    let topMovie = 'http://16.16.205.229/api/v1/app/filmworks/otherslider/?type=movie&limit=10&offset=50'



    if (category === 'cartoons') {
        sliderMovie = sliderCartoon
        ratingMovie = ratingCartoon
        chartMovie = chartCartoon
        topMovie = topCartoon
    } else {
        sliderMovie = 'http://16.16.205.229/api/v1/app/filmworks/firstslider/?type=movie&limit=10'
        ratingMovie = 'http://16.16.205.229/api/v1/app/filmworks/otherslider/?type=movie&limit=10&offset=90'
        chartMovie = 'http://16.16.205.229/api/v1/app/filmworks/otherslider/?type=movie&limit=10&offset=80'
        topMovie = 'http://16.16.205.229/api/v1/app/filmworks/otherslider/?type=movie&limit=10&offset=50'

    }
      
    useEffect(() => {
        const fetchData = async () => {
          try {
            dispatch(setLoading(true));
    
            const response = await fetch(ratingMovie);
            const data = await response.json();
    
            dispatch(setTopRating(data));
            dispatch(setLoading(false));
          } catch (error) {
            dispatch(setError(error));
            dispatch(setLoading(false));
          }
        };
        
        fetchData();
      }, [dispatch]);

      console.log(Boolean(error))

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          dispatch(setLoading(true));
  
          const response = await fetch(chartMovie);
          const data = await response.json();
  
          dispatch(setTopInfo(data));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setError(error));
          dispatch(setLoading(false));
        }
      };
      
      fetchData();
    }, [chartMovie]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            dispatch(setLoading(true));
    
            const response = await fetch(topMovie);
            const data = await response.json();
    
            dispatch(setTopChart(data));
            dispatch(setLoading(false));
          } catch (error) {
            dispatch(setError(error));
            dispatch(setLoading(false));
          }
        };
    
        fetchData();
      }, [topMovie]);

    console.log(topInfo)

    
    return (
        <>
            <div className='swiper-container' >
                <Slider category={category} type={sliderMovie} />
            </div>

            <div className="container-main" >
                <h1>Топ Чартов</h1>
                <Carousel category={category} type={topInfo !== null ? topInfo : null}/>
                <h1>Топ Рейтингов</h1>
                <Carousel category={category} type={rating !== null ? rating : null}/>
                <h1>18+</h1>
                <Carousel category={category} type={chart !== null ? chart : null}/>

            </div>

            <Footer />

        </>
    );
};

export default MoviesPage;