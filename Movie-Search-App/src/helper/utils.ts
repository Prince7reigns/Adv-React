import type { MovieSummary } from "../types/movie";

export function isMovieWishlisted(
    wishlist:MovieSummary[],
    id:string
){
   return wishlist.some(m=>m.imdbID===id)
}