import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import SignUpPage from './pages/Auth/SignUpPage';
import AboutPage from './pages/AboutPage/AboutPage';
import MessageProfile from './pages/MessageProfile/MessageProfile';
import Profile from './pages/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import MoviesPage from './pages/MoviesPage';
import Navbar from './components/navbar/Navbar';
import { fetchData } from './store/MovieActions';
import { setError, setLoading, setSearchData } from './store/movieSlice';
import { setFocus } from './store/searchSlice';

function App() {
  const [count, setCount] = useState(0);
  const search = useSelector((state) => state.movie.search);
  const searchFocus = useSelector((state) => state.search.focus);
  const searchData = useSelector((state) => state.movie.searchData);
  const dispatch = useDispatch(); // Добавьте эту строку

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await fetch(`http://16.16.205.229/api/v1/app/filmworks/search/?search=${search !== null ? search : null}&limit=10`);
        const data = await response.json();

        dispatch(setSearchData(data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error));
        dispatch(setLoading(false));
      }
    };

    fetchData2();
  }, [search, dispatch]); // Добавьте dispatch в зависимости




  return (
    <>
      {
        (searchFocus === true ?
          <div className='container-search'>
            <div className="blocks">
              {
                searchData.results.map((d) => {
                  console.log(d.id)
                  return (
                    <div className="search-block" key={d.id} onClick={() => navigate(`/aboutpage/${d.id}`)}>
                      <img src={d.poster} alt="" className='search-photo' />
                      <p style={d.name.length > 18 ? { top: '-70px' } : null}>{d.name}</p>

                      {/* <NavLink to={`/aboutpage/${d.id}`} className='link' onClick={() => dispatch(setFocus())}>
                      </NavLink> */}
                    </div>
                  )
                })
              }
            </div>

          </div> : '')
      }

      <Navbar />


      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/movies/:category" element={<MoviesPage />} />
          <Route path="/aboutpage/:movieId" element={<AboutPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/message-profile"
            element={<MessageProfile />}
          />
        </Route>

        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/signup"
          element={<SignUpPage />}
        />


        <Route path="*" element={<div className='not-found' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '200px 0 0 0', fontSize: '50px'} }>Error 404</div>} />
      </Routes>
    </>
  )
}

export default App
