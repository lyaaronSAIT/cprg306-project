"use client"
import React, { useEffect, useState } from 'react';
import Movie from './Movie';

function Popular({ addToWatchList, addToFavoritesList }) {
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
                    <Movie
                        key={index}
                        movie={movie}
                        addToWatchList={() => addToWatchList(movie)} // Pass addToWatchList as a prop
                        addToFavoritesList={() => addToFavoritesList(movie)} // Pass addToFavoritesList as a prop
                    />
                ))}
        </div>
    );
}

export default Popular;
