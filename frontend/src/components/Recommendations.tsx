import React from "react";
import MoviePoster from "./MoviePoster";

type RecProps = {
  movieID: number | null;
  showMatchScore: boolean;
  onToggleMatchScore: () => void;
};

type Recommendation = {
  id: number;
  title: string;
  genre: string;
  overview: string;
  similarity: number;
  release_date: string;
  poster_url: string;
};

export default function Recommendations({ movieID, showMatchScore, onToggleMatchScore }: RecProps) {
  const [recommendations, setRecommendations] = React.useState<
    Recommendation[]
  >([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!movieID) {
      setRecommendations([]);
      return;
    }

    async function getRecommendations() {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8000/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movie_id: movieID }),
        });

        const data = await response.json();
        setRecommendations(data.recommendations || []);
      } catch (error) {
        console.error("Recommendation error:", error);
      } finally {
        setLoading(false);
      }
    }

    getRecommendations();
  }, [movieID]);

  if (!movieID) {
    return null;
  }

  if (loading) {
    return <p className="rec-loading">
      Loading recommendations...</p>;
  }

  return (
    <section className="rec-section">

      <div className="rec-header">
        <h3 className="rec-title">RECOMMENDATIONS:</h3>

        <button
          type="button"
          className="score-toggle"
          onClick={onToggleMatchScore}
        >
          {showMatchScore ? "Hide Scores" : "View Scores"}
        </button>
      </div>

      <ul className="rec-list">
        {recommendations.map((movie) => (
          <li className="rec-item" key={movie.id}>
            <MoviePoster
              title={movie.title}
              posterUrl={movie.poster_url}
              genre={movie.genre}
              overview={movie.overview}
              releaseDate={movie.release_date}
              similarity={movie.similarity}
              showMatchScore={showMatchScore}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
