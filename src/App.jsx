import Search from './components/Search'
import heroImage from "./assets/hero.png"
import {useEffect, useState} from "react";
import Spinner from "./components/Spinner"
import MovieCard from "./components/MovieCard"
import {useDebounce} from "react-use"
// import {updateSearchCount} from "./appwrite.js";

const BASE_URL = "https://api.themoviedb.org/3"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

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
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

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

            // if(query && data.results.length > 0){
            //     await updateSearchCount(query, data.results[0]);
            // }

        }catch(e){
            console.log(e)
            setErrMessage(`Error fetching movies`)
        }finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchMovies(debouncedSearchTerm)
    },[debouncedSearchTerm])

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