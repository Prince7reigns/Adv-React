import { useNavigate } from "react-router"
import type { Props } from "../types/movie"
import MovieCard from "../components/MovieCard"


const Favorites = ({wishlist,onToggleWishlist}:Props) => {
  const navigate = useNavigate()

   function onNavigate(param:string){
      navigate(`/movie/${param}`)
  }

  if(wishlist.length === 0){
    return <div className="h-screen bg-gray-950 text-2xl text-red-600 p-6">{wishlist.length} Result Found</div>
  }

  return (
      <div className="h-screen grid grid-cols-1 p-4 sm:grid-cols-2 xl:grid-cols-5 gap-8 bg-gray-950">
        {
        wishlist.map((movie) => (
            <MovieCard wishlist={wishlist} onToggleWishlist={onToggleWishlist} onNavigate={onNavigate} key={movie.imdbID} movie={movie} />
        ))}
      </div>
  )
}

export default Favorites
