import {useNavigate, useSearchParams } from "react-router"
import movieService from "../services/movieApi"
import type {MovieSummary} from '../types/movie.ts'
import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard.tsx"
import type { Props } from "../types/movie";


const Movies = ({ wishlist, onToggleWishlist }: Props) => {

  const [error,setError] = useState<string>('')
  const [loading,setLoading] = useState<boolean>(true)
  const [movies,setMovies]=useState<MovieSummary[]>([])
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get("q") ?? ""


  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        setError("")
        const data = await movieService.search(query)
        if(data.length === 0){
          throw new Error("No Result found")
        }
        setMovies(data)

      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [query])

  function onNavigate(param:string){
      navigate(`/movie/${param}`)
  }

  if(loading) {
    return <div className="h-screen  bg-gray-950 flex justify-center items-center text-red-600 text-8xl">...Loading</div>
  }

   if(error ) {
    return <div className="h-screen  bg-gray-950 flex justify-center items-center text-red-600 text-8xl">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 p-4 sm:grid-cols-2 xl:grid-cols-5 gap-8 bg-gray-950">
        {
        movies.map((movie) => (
            <MovieCard wishlist={wishlist} onToggleWishlist={onToggleWishlist} onNavigate={onNavigate} key={movie.imdbID} movie={movie} />
        ))}
   </div>
  )
}

export default Movies
