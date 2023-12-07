"use client"
import React, { useEffect, useState } from 'react';

function Popular() {
    const [popularMovies, setPopularMovies] = useState([]);

    const getPopularMovies = () => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=0a53621515ffe7c5f72c043f39512f98")
            .then(res => res.json())
            .then(json => setPopularMovies(json.results))
    }

    useEffect(() => {
        getPopularMovies()
    }, []);
    
    return (
        <div className="container mx-auto h-screen overflow-y-auto w-1/3">
            <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
            {popularMovies.map((movie, index) => (
                <div key={index} className="flex items-center my-4">
                    <img
                        className="w-max-xl h-64 object-cover mr-8"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`Poster of ${movie.title}`}
                    />
                    <div>
                        <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                        <p className="text-white-600">{movie.overview}</p>
                        <p className="text-white-600">Release Date: {movie.release_date}</p>
                        <p className="text-white-600">Rating: {movie.vote_average}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Popular;
