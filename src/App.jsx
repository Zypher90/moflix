import Search from './components/Search'
import heroImage from "./assets/hero.png"
import {useEffect, useState} from "react";
import Spinner from "./components/Spinner"
import MovieCard from "./components/MovieCard"

const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGMyYmI4YjgzOTM1YTRiY2YxYzQ0MWM2ODExNWE4OCIsIm5iZiI6MTc3NDA4NjI3OC4zODYsInN1YiI6IjY5YmU2ODg2NjIzZTQwODM2ZGE1ZTEwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjRIoz3vv6CjvCjF9NOgSSQEJvMWRRB0d3y2Ykt2gck";

const API_OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [errMessage, setErrMessage] = useState(null)
    const [movieList, setMovieList] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchMovies = async (query = '') => {
        setLoading(true)
        setErrMessage(null)
        try{
            const endpointURL = query?
                    `${BASE_URL}/search/movie?query=${query}`
                :
                    `${BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpointURL, API_OPTIONS);
            if(!response.ok){
                setErrMessage(response.statusText)
            }
            const data = await response.json();
            if(!data){
                setErrMessage('Failed to fetch movies, try again')
            }
            console.log(data)
            if(data.Response === 'False'){
                setErrMessage(data.Error || 'Failed to fetch movies');
                setMovieList([]);
                return;
            }
            setMovieList(data.results);
        }catch(e){
            console.log(e)
            setErrMessage(`Error fetching movies`)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies(searchTerm)
    },[searchTerm])

    return (
        <>
            <main>
                <div className="wrapper">
                    <header>
                        <h1 className="lg-text">Watch your favourite movies, hassle free</h1>
                        <img src={heroImage} className="hero-image" alt="Hero Image"/>
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </header>
                    <section className="all-movies">
                        <h1>All Movies</h1>
                        {loading ? (<Spinner />) :
                            errMessage ? (
                                    <h2 className="text-2xl text-red-500">{errMessage}</h2>
                                ) : (
                                    <ul className="display-popular">
                                        {movieList.map(movie => (
                                            <MovieCard movie={movie} key={movie.id} />
                                        ))}
                                    </ul>
                                )
                        }
                    </section>
                </div>
            </main>
        </>
    )
}

export default App