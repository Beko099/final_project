import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom'
import Carousel from '../components/carousel/Carousel';
import Slider from '../components/slider/slider';
import Footer from '../components/Footer/Footer';
import { useSelector } from 'react-redux';
// import { horrorData, familyData } from './Data';


const HomePage = () => {


    const [topData, setTopData] = useState(null)
    const topApi = 'http://16.16.205.229/api/v1/app/filmworks/otherslider/?type=movie&limit=10&offset=40'
    useEffect(() => {
        fetch(topApi)
            .then(response => response.json())
            .then(d => {
                setTopData(d);
                setLoading(false);
            })
            .catch(error => {
                // setError(error);
                // setLoading(false);
            });
    }, []);

    // -------------Horror--------------
    const [horrorData, setHorrorData] = useState(null)
    const horrorApi = 'http://16.16.205.229/api/v1/app/filmworks/otherslider/?type=movie&limit=10&offset=50'
    useEffect(() => {
        fetch(horrorApi)
            .then(response => response.json())
            .then(d => {
                setHorrorData(d);
                setLoading(false);
            })
            .catch(error => {
                // setError(error);
                // setLoading(false);
            });
    }, []);

    // -------------Family--------------
    const [familyData, setFamilyData] = useState(null)
    const familyApi = 'http://16.16.205.229/api/v1/app/filmworks/otherslider/?type=movie&limit=10'
    useEffect(() => {
        fetch(familyApi)
            .then(response => response.json())
            .then(d => {
                setFamilyData(d);
                setLoading(false);
            })
            .catch(error => {
                // setError(error);
                // setLoading(false);
            });
    }, []);

    const search = useSelector(state => state.search.focus)

    const { category } = useParams()

    const token = localStorage.getItem('token')

    console.log(token)


    
    return (
        <>
            <div className='swiper-container' style={
                search === true ? {marginTop: '200px'} : null
            }>
                <Slider category={category} type={'http://16.16.205.229/api/v1/app/filmworks/firstslider/?ordering=-premiere&limit=10'}/>
            </div>

            <div className="container-main" >
                <h1>Топ Чартов</h1>
                <Carousel category={category} type={familyData !== null ? familyData : null}/>
                <h1>Топ Рейтингов от критиков</h1>
                <Carousel category={category} type={horrorData !== null ? horrorData : null}/>
                <h1>ТопРейтингов от зрителей</h1>
                <Carousel category={category} type={topData !== null ? topData: null}/>

            </div>

            <Footer />

        </>
    );
};

export default HomePage;