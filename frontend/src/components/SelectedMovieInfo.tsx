import type { MovieDetails } from "../types/movieTypes";

type SelectedMovieProps = {
  movie: MovieDetails | null;
};

function formatReleaseDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Release date unknown";
  }

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
}

export default function SelectedMovieInfo( {movie}:SelectedMovieProps) {
  if(!movie){
    return null;
  }

  const genres = movie.genre
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  return (
    <section className="selected-section">
      <div className="selected-card">
        <img
          className="selected-img"
          src={movie.poster_url}
          alt={movie.title}
        />

        <div className="selected-info">
          <h2 className="selected-title">{movie.title}</h2>

          <div className="selected-meta">

            <span className="selected-date">
              {formatReleaseDate(movie.release_date)}
            </span>

            <div className="selected-genres">
              {genres.map((item) => (
                <span key={item} className="selected-genre-item">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <p className="selected-overview">{movie.overview}</p>
        </div>
      </div>

      <h3 className="selected-label">RECOMMENDATIONS:</h3>
    </section>
  );
}
