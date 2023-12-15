import React from 'react';

function Movie({ movie, addToWatchList, addToFavoritesList }) {
    const { title, overview, poster_path, release_date, vote_average } = movie;

    const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const formattedRating = vote_average.toFixed(1);
    
    // Function to truncate the movie description to a certain length
    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...'; // Truncate description and add ellipsis
        } else {
            return text;
        }
    };

    const handleAddToWatchList = () => {
        addToWatchList(movie); // Add this movie to the "To Watch" list
    };

    const handleAddToFavoritesList = () => {
        addToFavoritesList(movie); // Add this movie to the "Favorites" list
    };

    return (
        <div className="flex items-center my-4">
            <img
                className="w-max-xl h-64 object-cover mr-8"
                src={imageUrl}
                alt={`Poster of ${title}`}
            />
            <div>
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-white-600">{truncateDescription(overview, 250)}</p>
                <p className="text-white-600">Release Date: {release_date}</p>
                <p className="text-white-600">Rating: {formattedRating}</p>
                {/* Buttons to add to lists */}
                <button onClick={handleAddToWatchList} className="bg-blue-500 text-white rounded-md px-3 py-1 mt-2 mr-2">Add to Watch List</button>
                <button onClick={handleAddToFavoritesList} className="bg-yellow-500 text-white rounded-md px-3 py-1 mt-2">Add to Favorites</button>
            </div>
        </div>
    );
}

export default Movie;
