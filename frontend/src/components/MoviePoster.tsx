
type MoviePosterProps = {
  title: string;
  posterUrl?: string;
  genre: string;
  overview: string;
  releaseDate: string;
  similarity: number;
};

export default function MoviePoster({
    title, 
    posterUrl, 
    genre, 
    overview, 
    releaseDate, 
    similarity}: MoviePosterProps) {
        
  return (
    <section className="movie-poster">
      <img
        className="poster-img"
        src={posterUrl || "/file-not-found.jpg"}
        alt={`${title} movie poster`}
      />

      <div className="poster-content">
        <h3 className="poster-title">{title}</h3>

        <div className="poster-meta">
          <span className="poster-genre">{genre}</span>
          <span className="poster-date">{releaseDate}</span>
        </div>

        <p className="poster-overview">{overview}</p>

        <p className="poster-score">
          Match Score: {(similarity * 100).toFixed(2)} %
        </p>
      </div>
    </section>
  );
}
