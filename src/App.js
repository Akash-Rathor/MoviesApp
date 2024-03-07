import React from "react";
import { useEffect,useState } from "react";

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard'

const API_URL = 'http://www.omdbapi.com?apikey=5d350091'


const App = () => {
    const [movieTitle,setMovieTitle] = useState('');
    const [movies,setMovies] = useState([]);


    
    function typeText() {
        
        const textElement = document.querySelector(".TypeWriter");
        const text = textElement.textContent.trim();
        const textLength = text.length;
        let currentIndex = 0;
        let displayedText = '';
    
        function typingEffect() {
            if (currentIndex < textLength) {
                displayedText += text[currentIndex];
                textElement.textContent = displayedText + '|';
                currentIndex++;
                setTimeout(typingEffect, 100); // Typing speed
            } 
            else {
                currentIndex = 0;
                displayedText = '';
                setTimeout(typingEffect, 3000);
            }
        }
        typingEffect();
    }
    


    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search)
    };

    useEffect (() => {
        searchMovies('');
        typeText();
    },[]);


    return (
        <div className='app'>
            <h1 className="TypeWriter">
                Movies App By Akash Rathor     .
            </h1>

            <div className="search">
                <input
                    placeholder ='Search for movies'
                    value={movieTitle}
                    onChange={(e)=> setMovieTitle(e.target.value)}
                />

                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick = {() => searchMovies(movieTitle)}
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {
                            movies.map((movie) => (
                                <MovieCard movie={movie}/>
                            ))
                        }
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Movies found</h2>
                        </div>
                )   
            }

        </div>
    );
}

export default App;