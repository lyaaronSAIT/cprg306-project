"use client"
import React, { useEffect, useState } from 'react';
import Movie from './Movie';

function TopRatedMovies({ addToWatchList, addToFavoritesList }) {
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    const getTopRatedMovies = () => {
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=0a53621515ffe7c5f72c043f39512f98")
            .then(res => res.json())
            .then(json => setTopRatedMovies(json.results))
    }

    useEffect(() => {
        getTopRatedMovies()
    }, []);

    return (
        <div className="container mx-auto h-screen overflow-y-auto w-1/3">
            <h1 className="text-3xl font-bold mb-4">Top Rated Movies</h1>
                {topRatedMovies.map((movie, index) => (
                    <Movie
                    key={index}
                    movie={movie}
                    addToWatchList={() => addToWatchList(movie)}
                    addToFavoritesList={() => addToFavoritesList(movie)}
                    />
                ))}
        </div>
    );
}

export default TopRatedMovies;
