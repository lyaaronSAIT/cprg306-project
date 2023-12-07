import React from 'react';
import Popular from './scr/components/Popular';
import TopRated from './scr/components/TopRated';
import UpcomingMovies from './scr/components/Upcoming';

function App() {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-5xl mb-4'>MovieVerse</h1>
            <div className='flex'>
                    <Popular/>
                    <TopRated/>
                    <UpcomingMovies/>
            </div>
        </div>
    )
}

export default App;
