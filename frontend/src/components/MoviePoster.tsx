import React from "react";

type MoviePosterProps = {
  title: string;
  posterUrl?: string;
  genre: string;
  overview: string;
  releaseDate: string;
  similarity: number;
};

function formatReleaseDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function MoviePoster({
    title, 
    posterUrl, 
    genre, 
    overview, 
    releaseDate, 
    similarity}: MoviePosterProps) {
    
  const [expanded, setExpanded] = React.useState(false)
  const [canExpand, setCanExpand] = React.useState(false);
  const overviewRef = React.useRef<HTMLParagraphElement | null>(null);
  const genres = genre
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  React.useEffect(() => {
    const element = overviewRef.current;

    if(!element || expanded) return;

    setCanExpand(element.scrollHeight > element.clientHeight);
  }, [overview, expanded]);
        
  
  return (
    <section className={`movie-poster ${expanded ? "expanded" : ""}`}>
      <img
        className="poster-img"
        src={posterUrl || "/file-not-found.jpg"}
        alt={`${title} movie poster`}
      />

      <div className="poster-content">
        <h3 className="poster-title">{title}</h3>

        <div className="poster-meta">
          <span className="poster-date">{formatReleaseDate(releaseDate)}</span>

          <div className="poster-genre">
            {genres.map((item) => (
                <span key={item} className="poster-genre-item">
                  {item}
                </span>
              ))}
          </div>


        </div>

          <p 
            ref={overviewRef}
            className={`poster-overview ${expanded ? "expanded" : "clamped"}`}
            >{
              overview}
          </p>

          {(canExpand || expanded) && (
            <button
              type="button"
              className="poster-toggle"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Show less" : "Show More"}
            </button>
          )}

        <p className="poster-score">
          Match Score: {(similarity * 100).toFixed(2)} %
        </p>
      </div>
    </section>
  );
}
