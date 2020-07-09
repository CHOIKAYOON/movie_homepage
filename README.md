## 영화 포스터 홈페이지

리액트로 만든 영화 포스터 웹 어플리케이션입니다. 

![영화](https://user-images.githubusercontent.com/31337244/85661365-961bcf80-b6f1-11ea-914e-bea6c157d401.JPG)

---

### Components 설계 구조
* App.js - state 설정 및 외부 API 호출
* App.css
* Movie.js
  * MoviePoster function - 영화 이미지를 담는 함수.
  * Movies_Genres function - 영화 줄거리 담는 함수


#### App.js
```
import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component{

state ={}

//페이지 렌더링 시 API 호출 선언
componentDidMount(){
 this._getMovie();

}

//받은 data 값을 반복되는 값을 map으로 처리해서 <Movie /> components에 값을 넣어줬다. 
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

// 외부API함수(movieApi()) 호출 후 응답 값을 state 선언
  _getMovie = async() =>{
    const movies = await this._movieApi();
    this.setState({
      movies
    })
  }
  

// fetch로 외부 API 호출 
_movieApi = () =>{
  return fetch('https://yts.mx/api/v2/list_movies.json?sort_by=rating')
  .then(req => req.json())
  .then(json=> json.data.movies)
  .catch(err => console.log(err))
}

  render(){
    return(
      <div className= "App">
      //state 값에 Movies  data가 있으면 _reanderMovies()함수 호출 
        {this.state.movies ? this._reanderMovies() : "Loding"}
      </div>

    )
  }
}

export default App;

```
--
#### Movies.js
```
import React, { Component } from 'react';
import './Movie.css';

//Movie 함수 선언
//APP.js에서 받은 값을 html에 값을 넣어줬다.
function Movie ({title, poster, genres, synopsis}){
    return(
        <div className ="Movie_Columns"  >
            <div className ="Movie_Columns_poster">
            //MoviePoster 함수 호출
                <MoviePoster poster={poster} alt ={title}/>
            </div>
            <div className ="Movie_Columns_title">
                <h1> {title}</h1>
                <div className ="Movie_Columns_Genres">
                //반복되는 값을 map을 통해 호출 후 Movies_Genres 호출
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
```
--

#### APP.css
```
.Movie_Columns{
    margin: 200px;
    height: 1200px;;
    width: 780px;
    float: left;
    background: white;
    border-radius: 30px;
    border-right: 15px solid #ccc;
    border-bottom: 15px solid #999;
}

body{
    background-color: #eff3f7;
}
.Movie_Columns_title h1{
    text-align: center;
    font-size: 40px;
}

.Movie_Columns_title{
    margin: 100px 40px auto;
}

 p{
    width: 700px;
    height: 700px;
    text-align: center;
    font-size: 32px;
    max-height: 10em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
}

.Movie_Columns_Genres{
    text-align: center;
}

.Movie_Columns_Genres span{
    font-size: 35px;
}

.Movie_Columns_poster img{
    width: 600px;
    height: 600px;
    margin-top: -100px;
    border-radius: 20px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    filter: drop-shadow(11px 18px 12px black);
}

.Movie_Content_View{
    width: 500px;
    height: 500px;
}
```
