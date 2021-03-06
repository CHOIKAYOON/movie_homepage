import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component{

state ={}

componentDidMount(){
 this._getMovie();

}

  _reanderMovies = () =>{
    const movies = this.state.movies.map((movie)=> {
        return <Movie 
        title ={movie.title_english} 
        poster = {movie.medium_cover_image} 
        key = {movie.id}
        genres = {movie.genres}
        synopsis = {movie.synopsis} />
    })
    return movies
  }

  _getMovie = async() =>{
    const movies = await this._movieApi();
    this.setState({
      movies
    })
  }
  

_movieApi = () =>{
  return fetch('https://yts.mx/api/v2/list_movies.json?sort_by=rating')
  .then(req => req.json())
  .then(json=> json.data.movies)
  .catch(err => console.log(err))
}

  render(){
    return(
      <div className= "App">
        {this.state.movies ? this._reanderMovies() : "Loding"}
      </div>

    )
  }
}

export default App;
