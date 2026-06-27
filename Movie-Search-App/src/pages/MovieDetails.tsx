import { useEffect, useState, } from "react"
import movieService from "../services/movieApi"
import { useParams } from "react-router"
import type { MovieDetails } from "../types/movie"
import {
  Star,
  Calendar,
  Clock,
  Globe,
  Award,
  DollarSign,
  Film,
  Users,
  PenSquare,
  Plus,
  Minus,
} from "lucide-react";

import type { Props } from "../types/movie";
import { isMovieWishlisted } from "../helper/utils";

const MovieDetail = ({ wishlist, onToggleWishlist }: Props) => {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        setError("Movie ID missing")
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        setError("")
        const data = await movieService.getMovie(id)
        if (!data) {
          throw new Error("No Result found")
        }
        // API may return a different response shape; assert to MovieDetails for state assignment
        setMovie(data)
      } catch (error) {
        console.log(error)
        setError(error instanceof Error ? error.message : String(error))
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  const isWishlisted = isMovieWishlisted(wishlist, id ?? "")


  function handleWishlist(movie:MovieDetails){
    
    onToggleWishlist({
     Title: movie.Title,
     Poster: movie.Poster,
     imdbID: movie.imdbID,
     Type: movie.Type,
     Year: movie.Year,
   })
  }
  

  if (loading) {
    return <div className="h-screen  bg-gray-950 flex justify-center items-center text-red-600 text-8xl">...Loading</div>
  }

  if (error) {
    return <div className="h-screen  bg-gray-950 flex justify-center items-center text-red-600 text-8xl">{error}</div>
  }


  return (
    <section className="bg-black text-white min-h-screen">
      {/* Hero */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
          style={{ backgroundImage: `url(${movie?.Poster})` }}
        />

        <div className="absolute inset-0 bg-linear-to-r from-black via-black/90 to-black/70" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* Poster */}
            <div className="flex justify-center">
              <img
                src={movie?.Poster}
                alt={movie?.Title}
                className="rounded-2xl shadow-2xl w-full max-w-sm border border-gray-800"
              />
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-5xl font-bold">{movie?.Title}</h1>

                <div className="flex flex-wrap gap-3 mt-5">
                  <span className="bg-red-600 px-4 py-2 rounded-full">
                    {movie?.Rated}
                  </span>

                  <span className="bg-zinc-800 px-4 py-2 rounded-full flex items-center gap-2">
                    <Calendar size={16} />
                    {movie?.Year}
                  </span>

                  <span className="bg-zinc-800 px-4 py-2 rounded-full flex items-center gap-2">
                    <Clock size={16} />
                    {movie?.Runtime}
                  </span>

                  <span className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                    <Star size={16} fill="black" />
                    {movie?.imdbRating}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {movie?.Genre.split(", ").map((genre) => (
                    <span
                      key={genre}
                      className="bg-zinc-900 border border-zinc-700 px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Plot */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Overview</h2>

                <p className="text-gray-300 leading-8">{movie?.Plot}</p>
              </div>

              {/* Buttons */}

                <button onClick={()=>movie && handleWishlist(movie)} className={`border hover:border-white px-8 py-3 rounded-xl flex items-center cursor-pointer gap-2 ${isWishlisted ? 'border-gray-500':'border-gray-600'}`}>
                   {isWishlisted ? <Minus size={18} /> :<Plus size={18} />} 
                  Watchlist <span className="text-2xl">{isWishlisted ? "❤️" : "🤍"}</span>
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        {/* Ratings */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Ratings</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {movie?.Ratings.map((rating) => (
              <div
                key={rating.Source}
                className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
              >
                <h3 className="text-red-500 font-semibold">
                  {rating.Source}
                </h3>

                <p className="text-3xl font-bold mt-2">{rating.Value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Movie Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Movie Information</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <Info icon={<Calendar />} title="Released" value={movie?.Released ?? "N/A"} />

            <Info icon={<Clock />} title="Runtime" value={movie?.Runtime ?? "N/A"} />

            <Info icon={<Film />} title="Type" value={movie?.Type ?? "N/A"} />

            <Info icon={<Globe />} title="Language" value={movie?.Language ?? "N/A"} />

            <Info icon={<Globe />} title="Country" value={movie?.Country ?? "N/A"} />

            <Info icon={<Star />} title="IMDb Votes" value={movie?.imdbVotes ?? "N/A"} />

          </div>
        </div>

        {/* Cast & Crew */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Cast & Crew</h2>

          <div className="grid md:grid-cols-3 gap-6">

            <Info
              icon={<Users />}
              title="Director"
              value={movie?.Director ?? "N/A"}
            />

            <Info
              icon={<PenSquare />}
              title="Writer"
              value={movie?.Writer ?? "N/A"}
            />

            <Info
              icon={<Users />}
              title="Actors"
              value={movie?.Actors ?? "N/A"}
            />

          </div>
        </div>

        {/* Awards */}
        {movie?.Awards !== "N/A" && (
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-yellow-400" />
              <h2 className="text-3xl font-bold">Awards</h2>
            </div>

            <p className="text-gray-300">{movie?.Awards}</p>
          </div>
        )}

        {/* Box Office */}
        {movie?.BoxOffice !== "N/A" && (
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="text-green-400" />
              <h2 className="text-3xl font-bold">Box Office</h2>
            </div>

            <p className="text-2xl font-semibold">{movie?.BoxOffice}</p>
          </div>
        )}
      </div>
    </section>
  )
}

interface InfoProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const Info = ({ icon, title, value }: InfoProps) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
    <div className="flex items-center gap-2 text-red-500 mb-3">
      {icon}
      <span className="font-semibold">{title}</span>
    </div>

    <p className="text-gray-200">{value}</p>
  </div>
)

export default MovieDetail
