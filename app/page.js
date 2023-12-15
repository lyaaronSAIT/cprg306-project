"use client"
import React, { useState, useEffect } from 'react';
import Popular from './scr/components/Popular';
import TopRated from './scr/components/TopRated';
import UpcomingMovies from './scr/components/Upcoming';
import SearchBar from './scr/components/SearchBar';
import Movie from './scr/components/Movie';

function ToWatchListDetails({ toWatchList, removeFromWatchList }) {
    const handleRemove = (movie) => {
        removeFromWatchList(movie); // Function to remove a movie from the To Watch List
    };

    return (
        <div>
            {toWatchList.map((movie, index) => (
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
                        <button onClick={() => handleRemove(movie)} className="my-5 py-0.5 px-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600">
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function FavoritesListDetails({ favoritesList, removeFromFavoritesList }) {
    return (
      <div>
        {favoritesList.map((movie, index) => (
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
              {/* Remove button */}
              <button
                onClick={() => removeFromFavoritesList(movie)}
                className="my-5 py-0.5 px-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
              >
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    );
}

function App() {

    const [searchResults, setSearchResults] = useState([]);
    const [showSearchGrid, setShowSearchGrid] = useState(false);

    const [toWatchList, setToWatchList] = useState([]); // State for "To Watch" list
    const [favoritesList, setFavoritesList] = useState([]); // State for "Favorites" list

    const [showToWatchList, setShowToWatchList] = useState(false);
    const [showFavoritesList, setShowFavoritesList] = useState(false);

    // Function to load To Watch list and Favorites list from localStorage when the app initializes
    useEffect(() => {
        const storedToWatchList = JSON.parse(localStorage.getItem('toWatchList'));
        const storedFavoritesList = JSON.parse(localStorage.getItem('favoritesList'));
        if (storedToWatchList) {
            setToWatchList(storedToWatchList);
        }
        if (storedFavoritesList) {
            setFavoritesList(storedFavoritesList);
        }
    }, []);

    const handleSearch = (query) => {
        // Perform the API call to search movies based on the query
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=0a53621515ffe7c5f72c043f39512f98&query=${query}`)
            .then((res) => res.json())
            .then((data) => {
                setSearchResults(data.results);
                setShowSearchGrid(true); // Show search grid when results are obtained
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
                setSearchResults([]); // Reset search results on error
                setShowSearchGrid(false); // Hide search grid on error
            });
    };

    const addToWatchList = (movie) => {
        // Check if the movie is already in the list before adding
        const isMovieInList = toWatchList.some((item) => item.id === movie.id);
        if (!isMovieInList) {
            const newList = [...toWatchList, movie];
            setToWatchList(newList);
            localStorage.setItem('toWatchList', JSON.stringify(newList));
        } else {
            alert('Movie already in the list');
        }
    };

    const removeFromWatchList = (movie) => {
        const newList = toWatchList.filter((item) => item.id !== movie.id);
        setToWatchList(newList);
        localStorage.setItem('toWatchList', JSON.stringify(newList));
    };

    const addToFavoritesList = (movie) => {
        const isMovieInList = favoritesList.some((item) => item.id === movie.id);
        if (!isMovieInList) {
            const newList = [...favoritesList, movie];
            setFavoritesList(newList);
            localStorage.setItem('favoritesList', JSON.stringify(newList));
        } else {
            alert('Movie already in the favorites list');
        }
    };

    const removeFromFavoritesList = (movie) => {
        const newList = favoritesList.filter((item) => item.id !== movie.id);
        setFavoritesList(newList);
        localStorage.setItem('favoritesList', JSON.stringify(newList));
    };

    const handleToWatchListClick = () => {
        setShowToWatchList((prevState) => !prevState); // Set the state to show the To Watch List
        setShowFavoritesList(false); // Hide Favorites List when To Watch List is clicked
    };

    const handleFavoritesListClick = () => {
        setShowFavoritesList((prevState) => !prevState);
        setShowToWatchList(false); // Hide To Watch List when Favorites List is clicked
    };

    const handleClear = () => {
        setSearchResults([]); // Clear search results
        setShowSearchGrid(false); // Hide search grid
    };

    return (
        <div className={`flex flex-col items-center mx-auto container`}>
            {/* Webstie Title */}
            <h1 className="text-9xl font-bold mb-4">
                Movie<span className="text-violet-500">Verse</span>
            </h1>

            {/* Search Function */}
            <SearchBar handleSearch={handleSearch} handleClear={handleClear} />

            {/* Search Results */}
            {showSearchGrid && (
                <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto bg-gray-900 rounded-3xl p-4 m-4">
                    {searchResults.map((movie, index) => (
                        <Movie
                            key={index}
                            movie={movie}
                            addToWatchList={() => addToWatchList(movie)}
                            addToFavoritesList={() => addToFavoritesList(movie)}
                        />
                    ))}
                </div>
            )}

            {/* Different Movie Lists */}
            <div className="flex p-4 space-x-10 text-2xl">
                {/* To Watch List */}
                <div>
                    <button onClick={handleToWatchListClick}>
                        {showToWatchList ? 'Hide To Watch List' : 'View To Watch List'}
                    </button>
                </div>

                {/* Favorites List */}
                <div>
                <button onClick={handleFavoritesListClick}>
                    {showFavoritesList ? 'Hide Favorites List' : 'View Favorites List'}
                </button>
                </div>
            </div>

            {/* Display To Watch List Details when showToWatchList is true */}
            {showToWatchList && (
                <ToWatchListDetails
                    toWatchList={toWatchList}
                    removeFromWatchList={removeFromWatchList}
                />
            )}

            {/* Display Favorites List Details when showFavoritesList is true */}
            {showFavoritesList && (
                <FavoritesListDetails
                favoritesList={favoritesList}
                removeFromFavoritesList={removeFromFavoritesList}
                />
            )}

            <div className='flex'>
                <Popular addToWatchList={addToWatchList} addToFavoritesList={addToFavoritesList} />
                <TopRated addToWatchList={addToWatchList} addToFavoritesList={addToFavoritesList} />
                <UpcomingMovies addToWatchList={addToWatchList} addToFavoritesList={addToFavoritesList} />
            </div>
        </div>
    )
}

export default App;