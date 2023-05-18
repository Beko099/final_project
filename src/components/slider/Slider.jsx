import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './slider.css';
import 'swiper/css/autoplay';
import Favorite from '../../assets/Favorite';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function CreateSlide({ img = '', name, id, genres, year, ageRating }) {

  const navigate = useNavigate()

  function handleClick() {
    navigate(`/aboutpage/${id}`)
  }

  return (
    <div className='image-slide' onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img className="img" src={img} alt="" />
      {/* <button className='button-favorite'>
        <Favorite />
        <p>{`В избранное`}</p>
      </button> */}
      <div className="name">{name}</div>
      <div className="container-info-slide">
        <p>{genres}</p>
        <p>{year}</p>
        <p>{ageRating}+</p>
      </div>
    </div>
  );


}

export default function Slider({ img, genres, type }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      fetch(`${type}`)
        .then((response) => response.json())
        .then((d) => {
          setData(d);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [type]);

  if (data !== null) {
    // console.log(data)  
    return (
      <Swiper
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        spaceBetween={30}
        autoplay={{
          delay: 5000, // time between transitions (in ms)
        }}
      >
        {data.results.map((i, index) => {
          return (
            <SwiperSlide key={index}>
              <CreateSlide
                id={i.id}
                img={i.backdrop}
                name={i.name}
                year={i.year}
                genres={i.genres[0].name}
                ageRating={i.age_rating}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  } else if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  } else if (error) {
    return <div style={{
      textAlign: 'center',
      fontSize: '44px',
      margin: '100px 0 100px 0',
    }}>Извините, но у нас технические проблемы, пожалуйста зайдите в другое время</div>;
  } else {
    return null;
  }
}
