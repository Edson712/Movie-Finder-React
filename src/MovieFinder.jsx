import { useState } from "react"

export const MovieFinder = () => {

    const baseURL = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = '4974a1800bf9b456bebf72611be10dd0'

    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])

    const handleInputChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchMovies()
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${baseURL}?query=${search}&api_key=${API_KEY}`)
            const data = await response.json()
            setMovies(data.results)
        } catch (error) {
            console.error('Problem found: ', error)
        }
    }
    return (
        <div className="container">
            <h1 className="title">
                Movie Finder
            </h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Find a Movie"
                    value={search}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            
            <div className="movie-list">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <h4>Release Date: {movie.release_date}</h4>
                        <p>{movie.overview}</p>
                        <h4>Rating: {movie.vote_average.toFixed(1)}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}
