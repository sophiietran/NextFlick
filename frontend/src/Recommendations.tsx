import React from "react";

type RecProps = {
  movieID: number | null;
};

type Recommendation = {
  id: number;
  title: string;
  genre: string;
  overview: string;
  similarity: number;
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
    return <p>Select a movie to get recommendations.</p>;
  }

  if (loading) {
    return <p>Loading recommendations...</p>;
  }

  return (
    <section >
      <h2>Recommendations</h2>
      <ul>
        {recommendations.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
