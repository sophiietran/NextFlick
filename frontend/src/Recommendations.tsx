import React from "react";
import MoviePoster from "./components/MoviePoster";

type RecProps = {
  movieID: number | null;
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

export default function Recommendations({ movieID }: RecProps) {
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
    return
  }

  if (loading) {
    return <p className="rec-loading">
      Loading recommendations...</p>;
  }

  return (

      <section className="rec-section" >
        <h2 className="rec-title">Recommendations</h2>
        <ul className="rec-list">
          {recommendations.map((movie) => (
            <li className="rec-item" key={movie.id}>
              <MoviePoster
                title = {movie.title}
                posterUrl={movie.poster_url}
                genre={movie.genre}
                overview={movie.overview}
                releaseDate={movie.release_date}
                similarity={movie.similarity}/>
            </li>
          ))}
        </ul>
      </section>

    
  );
}
