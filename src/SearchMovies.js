import React, {useState} from 'react'
import MovieCard from './MovieCard'

export default function SearchMovies(){
    
    //states - input query, movies
    const [query, setQuery] = useState('')
    const [ movies, setMovies] = useState([])

    const searchMovies = async (e) => {
        e.preventDefault()
        
        const apiKey='e9a85da5a6baead4436c8e0aea0ef91d'
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
        
        try {
            const res = await fetch(url)
            const data  = await res.json()
            setMovies(data.results)
        }catch(err) {
            console.log(err)
    }
    }
    
    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard 
                        key={movie.id}
                        poster={movie.poster_path} 
                        title={movie.title} 
                        rel_date={movie.release_date} 
                        rating={movie.vote_average} 
                        overview={movie.overview} 
                    />
                    /* instructors MovieCard
                        <MovieCard movie={movie} key={movie.id} />
                    */
                ))}
            </div>
        </>
    )
}