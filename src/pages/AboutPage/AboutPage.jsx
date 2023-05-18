import React, { useEffect, useState } from 'react';
import './about.css';
import Footer from '../../components/Footer/Footer'
import Favorite from '../../assets/Favorite';
import Profile from '../../assets/ProfileLogo'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchData } from '../../store/MovieActions';
import { useDispatch, useSelector } from 'react-redux';
import { setCommentData } from '../../store/movieSlice';

const AboutPage = () => {

    const param = useParams()
    const id = param.movieId

    const dispatch = useDispatch()

    const [data, setData] = useState(null);
    const [comment, setComment] = useState('');

    const commentData = useSelector(state => state.movie.commentData)

    useEffect(() => {
        dispatch(fetchData());
    }, []);

    useEffect(() => {
        fetch(`http://16.16.205.229/api/v1/app/filmworks/${id}`)
            .then(response => response.json())
            .then(d => {
                setData(d);
            })
            .catch(error => {
                console.error(error);
            });
    }, [param]);

    const handleButtonClick = async () => {
        const token = localStorage.getItem('token');
        const requestData = {
            "text": comment
        };

        try {
            const response = await axios.post(`http://16.16.205.229/api/v1/app/filmworks/${id}/comment/`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            // Обработка успешного ответа
            console.log(response.data);
        } catch (error) {
            // Обработка ошибок
            console.error(error);
        }
    };

    useEffect(() => {
        fetch(`http://16.16.205.229/api/v1/app/filmworks/${id}/comment/`)
            .then(response => response.json())
            .then(d => {
                dispatch(setCommentData(d));
            })
            .catch(error => {
                console.error(error);
            });
    }, [param]);

    setTimeout(() => {
        console.log(commentData)

    }, 1000)

    if (data !== null) {
        return (
            <>
                <div className='about-page'>
                    <h1>{data.name}</h1>
                    <div className="about-rating">
                        <div className="about-genres">
                            <div className="rating">{data.rating}</div>
                            <p>{data.type}</p>
                            <p>{data.year}</p>
                            <p>Россия</p>
                        </div>
                        {/* <Favorite /> */}
                    </div>
                </div>
                <div className="image-container">
                    <img src={data.backdrop} alt="" />
                </div>
                <div className="p-container">
                    <p>{data.description}</p>
                </div>
                <div className='about-page'>
                    <div className="about-info-container">
                        <img src={data.poster} alt="" className='about-photo' />
                        <div className="about-info">
                            <p>Год: <span>{data.year}</span></p>
                            <p>Жанр: <span>{data.genres.map((d) => `${d.name[0].toUpperCase()}${d.name.slice(1)}`).join(', ')}</span></p>
                            <p>Длительность: <span>{Math.floor(data.movie_length / 60)} {data.movie_length > 120 ? 'часа' : 'час'} {data.movie_length % 60} минут</span></p>
                            <p>Возраст: <span>{data.age_rating}+</span></p>
                            <p>Бюджет: <span>{data.budget} шекелей</span></p>
                        </div>
                    </div>
                    <h2>Создатели и актеры</h2>
                    <div className="actors-container">
                        {data.persons.slice(0, 6).map((p, index) => (
                            <div className="actors" key={index}>
                                <img src={p.photo} alt="" className='photo-actors' />
                                <p>{p.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="about-description"></div>
                </div>
                <div className="message-container">
                    <div className="message">
                        {
                            commentData !== null ? commentData.map((c) => {
                                return (
                                        <>
                                            <h1></h1>
                                            <p>{c.text}</p>
                                        </>
                                )

                            }) : null
                        }
                    </div>
                </div >
                <div className="container-comment">
                    <textarea name="" id="" cols="30" rows="10" placeholder='комментарий' value={comment} onChange={e => setComment(e.target.value)}></textarea>
                    <button onClick={handleButtonClick}>Отправить</button>
                </div>
                <Footer />
            </>
        );
    } else {
        return (
            <div className="loading-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }
};

export default AboutPage;
