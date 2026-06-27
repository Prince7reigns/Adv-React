
import type { MovieSummary } from "../types/movie";

interface Props {
  movie: MovieSummary;
  onNavigate: (param: string) => void;
}

const MovieCard = ({ movie,onNavigate }: Props) => {
  return (
    <div
      onClick={()=>onNavigate(movie.imdbID)}
      className="
      group
      bg-gray-900
      border
      border-gray-800
      rounded-3xl
      overflow-hidden
      shadow-lg
      hover:shadow-red-500/20
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-red-500
      cursor-pointer
      "
    >
      {/* Poster */}
      <div className="relative aspect-2/3 overflow-hidden rounded-t-3xl">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://placehold.co/600x900?text=No+Image"
          }
          alt={movie.Title}
          className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

        {/* Rating */}
        <div className="absolute top-4 right-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
            ⭐
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 space-y-4">
        <h2 className="text-red-500 text-xl font-bold line-clamp-1">
          {movie.Title}
        </h2>

        <div className="flex justify-between items-center flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm">
            📅 {movie.Year}
          </span>

          <span className="px-3 py-1 bg-red-600 rounded-full text-white text-sm capitalize">
            🎥 {movie.Type}
          </span>
        </div>

        <button
          className="
          w-full
          bg-red-600
          hover:bg-red-700
          transition
          py-3
          rounded-xl
          text-white
          font-semibold
          "
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;