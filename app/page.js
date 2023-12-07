import React from 'react';
import Popular from './scr/components/Popular';
import TopRated from './scr/components/TopRated';
import UpcomingMovies from './scr/components/Upcoming';

function App() {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-9xl mb-4'>MovieVerse</h1>
            <h2 className='text-4xl'>placeholder: Search Bar</h2>
            <div className='flex p-4 space-x-10 text-2xl'>
              <h2>placeholder: View To Watch List</h2>
              <h2>placeholder: View Favorite List</h2>
              <h2>placeholder: Create List</h2>
            </div>
            <div className='flex'>
                    <Popular/>
                    <TopRated/>
                    <UpcomingMovies/>
            </div>
        </div>
    )
}

export default App;
