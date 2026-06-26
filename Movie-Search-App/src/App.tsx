
import { BrowserRouter, Routes,Route } from "react-router";
import './App.css'
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";

function App() {

  return (
  
  <BrowserRouter>
     <Navbar/>

     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="movies" element={<Movies/>} />
      <Route path="movie/:id" element={<MovieDetails/>} />
      <Route path="favorites" element={<Favorites/>} />
     </Routes>
  </BrowserRouter>
  )
}

export default App
