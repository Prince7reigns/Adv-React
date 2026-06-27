
import { BrowserRouter, Routes,Route } from "react-router";
import './App.css'
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import { useEffect, useState } from "react";
import type { MovieSummary } from "./types/movie";

function App() {

  const [wishlist,setWishlist]=useState<MovieSummary[]>(()=>{
    const wishli = localStorage.getItem('wishlist')

    return wishli ?
        JSON.parse(wishli) 
        :
       []
  })

  function handlewishlist(movie:MovieSummary){

    const newMovie = {
      Title:movie.Title,
      Poster:movie.Poster,
      imdbID:movie.imdbID,
      Type:movie.Type,
      Year:movie.Year
    }

    setWishlist((prev) => {
    const exists  =   prev.some((m) => m.imdbID === movie.imdbID);

    if(exists){
      return prev.filter((m)=>m.imdbID !== movie.imdbID)
    }

    return [...prev, newMovie];
  });
  }

  useEffect(()=>{

     localStorage.setItem(
        'wishlist',
        JSON.stringify(wishlist)
      );

  },[wishlist])

  return (
  
  <BrowserRouter>
     <Navbar/>

     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="movies" element={<Movies wishlist={wishlist} onToggleWishlist={handlewishlist}/>} />
      <Route path="movie/:id" element={<MovieDetails wishlist={wishlist} onToggleWishlist={handlewishlist} />} />
      <Route path="favorites" element={<Favorites wishlist={wishlist} onToggleWishlist={handlewishlist}/>} />
     </Routes>
  </BrowserRouter>
  )
}

export default App
