"use client"
import React, { useEffect, useState } from 'react';

function PopularMovies() {

    const [popularMovies, setPopularMovies] = useState([])

    const getPopularMovies = () => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=0a53621515ffe7c5f72c043f39512f98")
        .then(res => res.json())
        .then(json => setPopularMovies(json.results))
    }

    useEffect(() => {
        getPopularMovies()
    },[])

    console.log(popularMovies)

    return (
        <div>
            Popular Movies
            {popularMovies.map((popularMovies) => (
                <img style={{width:"300px", height:"400px", marginLeft:"10px", marginTop:"10px"}} src={`https://image.tmdb.org/t/p/w500${popularMovies.poster_path}`}/>
            ))}
        </div>
    )
}

export default PopularMovies