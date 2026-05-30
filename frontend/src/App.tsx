import "./css/App.css";
import React from "react";
import MovieSearch from "./components/MovieSearch"
import Recommendations from "./components/Recommendations";
import SelectedMovieInfo from "./components/SelectedMovieInfo";
import type { MovieDetails } from "./types/movieTypes";

export default function App() {

  const [selectedMovie, setSelectedMovie] = React.useState<MovieDetails | null>(null);
  const [showMatchScore, setShowMatchScore] = React.useState(false);

  React.useEffect(() => {
    setShowMatchScore(false);
  }, [selectedMovie]);


  return (
    <main className="app">
      <div className="app-content">
        
        <MovieSearch onSelectMovie={setSelectedMovie} />
        <SelectedMovieInfo movie={selectedMovie} />
        <Recommendations 
          movieID={selectedMovie?.id ?? null} 
          showMatchScore={showMatchScore} 
          onToggleMatchScore={() => setShowMatchScore((prev) => !prev)}
          />
      </div>
    </main>
  );
}


