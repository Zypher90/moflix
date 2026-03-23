import starIcon from "../assets/star.svg"

const MovieCard = ({movie}) => {
    return (
        <div className="movie-card">
            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '../assets/no-movie.png'} alt={movie.title}/>
            <div className={"movie-details"}>
                <h3>{movie.title}</h3>
                <img src={starIcon} alt=""/>
                <span>{movie.vote_average.toFixed(1)}</span>
                <span>•</span>
                <span>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
            </div>

        </div>
    )
}

export default MovieCard;