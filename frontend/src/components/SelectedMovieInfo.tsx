import type { MovieDetails } from "../types/movieTypes";
type SelectedMovieProps = {
  movie: MovieDetails | null;
};

export default function SelectedMovieInfo( {movie}:SelectedMovieProps) {
  if(!movie){
    return null;
  }

  return (
    <section>
      <p className="selected-label">Finding recommendations for</p>

      <img src={movie.poster_url} alt={movie.title} />

      <h2 className="selected-title">{movie.title}</h2>

      <span className="selected-date">{movie.release_date}</span>
      <span className="selected-genres">{movie.genre}</span>

      <p className="selected-overview">{movie.overview}</p>
    </section>
  );
}
