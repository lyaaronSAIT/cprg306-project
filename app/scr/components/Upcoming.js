"use client"
import React, { useEffect, useState } from 'react';
import Movie from './Movie';

function UpcomingMovies({ addToWatchList, addToFavoritesList }) {
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    const getUpcomingMovies = () => {
        fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=0a53621515ffe7c5f72c043f39512f98")
            .then(res => res.json())
            .then(json => setUpcomingMovies(json.results))
            .catch(error => console.error("Error fetching upcoming movies:", error));
    }

    useEffect(() => {
        getUpcomingMovies();
    }, []);

    return (
        <div className="container mx-auto h-screen overflow-y-auto w-1/3">
            <h1 className="text-3xl font-bold mb-4">Upcoming Movies</h1>
            {upcomingMovies.map((movie, index) => (
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

export default UpcomingMovies;
