import type { MovieSummary, SearchMoviesResponse } from '../types/movie.ts'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL  =import.meta.env.VITE_API_URL

class MovieService {

    async search(query:string):Promise<MovieSummary[]>{
      const res = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${query}`
      )

      const data = await res.json()

      if(data.Response==="False"){
        throw new Error(data.Error);
      }

      console.log(data)

      return data.Search
    }

    async getMovie(id:string):Promise<SearchMoviesResponse>{
      const res = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&i=${id}`
      )

      const data = await res.json()

      if(data.Response==="False"){
        throw new Error("Failed to fetch movies");
      }

      return data
    }
}

const movieService = new MovieService()

export default movieService