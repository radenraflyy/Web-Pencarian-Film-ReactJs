import { useEffect } from 'react';
import './App.css';
import { getMovieList, SearchMovie } from "./api"
import { useState } from 'react';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])
  // console.log({popolarMovies: popularMovies});

  const PopularMovieList = () => {
    return popularMovies.map((Element, index) => {
      return (
        <div className='Movie-wrapper' key={index}>
          <div className="Movie-title">{Element.title}</div>
          <img src={`${process.env.REACT_APP_BASEIMGURL}/${Element.poster_path}`} alt="" className="Movie-image" />
          <div className="Movie-date">Realease: {Element.release_date}</div>
          <div className="Movie-rate">{Element.vote_average}</div>
        </div>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 3) {
      const searchMovie = await SearchMovie(q)
      setPopularMovies(searchMovie.results)
    }

    // console.log({query: searchMovie});
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Teach-Den Movie Mania</h1>
        <input
          type="text"
          placeholder="cari film kesayangan"
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList/>
        </div>
      </header>
    </div>
  )
}

export default App;
