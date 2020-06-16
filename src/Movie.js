import React, { Component } from 'react';
import './Movie.css';


function Movie ({title, poster, genres, synopsis}){
    return(
        <div className ="Movie_Columns" >
            <div className ="Movie_Columns_poster">
                <MoviePoster poster={poster} alt ={title}/>
            </div>
            <div className ="Movie_Columns_title">
                <h1> {title}</h1>
                <div className ="Movie_Columns_Genres">
                    {genres.map((genres, index) => <Movies_Genres genres ={genres} key ={index}/>)}
                </div>
                <p className="Movies_synopsis">
                    {synopsis}
                </p>
            </div>            
        </div>
    )
}


function MoviePoster({poster, alt}){
    return(
        <img src ={poster} alt={alt} title={alt} className="Movie-poster"/> 
        )
    }
    
function Movies_Genres({genres}){
    return(
    <span className="Movie_Genres">{genres}</span>
    )
}

export default Movie;