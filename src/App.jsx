import {useEffect, useState} from 'react';
import React from 'react';
import './App.css';
import MovieItemTile from './components/movie_item_tile';
import SearchIcon from './search.svg';
const API_URL='https://www.omdbapi.com?apikey=aa74aaa3';
const movie1={
    "Title": "Shrek Forever After",
    "Year": "2010",
    "imdbID": "tt0892791",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTY0OTU1NzkxMl5BMl5BanBnXkFtZTcwMzI2NDUzMw@@._V1_SX300.jpg"
};
const App=()=>{
    const [searchTextEditingController,updateSearchTextEditingController]=useState("")
    const [movies,setMovies]=useState([]);
    const searchMovies=async(title )=>{
        const response=await fetch(`${API_URL}&s=${title}`);
        const data=await response.json();
        setMovies(data.Search);
    }
    useEffect(()=>{
        searchMovies('shrek');
    },[]);
    
    return (<div className="app">
        <h1>MoveLand</h1>
        <div className="search">
            <input placeholder="Search for movies" value={searchTextEditingController} onChange={(e)=>{updateSearchTextEditingController(e.target.value);}} />
            <img src={SearchIcon} alt="Search Icon"
            onClick={()=>{
               searchMovies(searchTextEditingController);
            }}
            />
        </div>
       {movies?.length>0?
        (<div className="container">
            {movies.map((movie)=> <MovieItemTile movie={movie} key={movie.Title+movie.Year} />)}
        </div>):(
            <div className='empty'>
                <h2>No movies found</h2>
            </div>
        )}
    </div>
    );
}
export default App;