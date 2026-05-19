import "./App.css";
import React from "react";
import MovieSearch from "./MovieSearch"
import Recommendations from "./Recommendations";

type MovieSuggestion = {
  id: number;
  title: string;
};

export default function App() {

  const [selectedMovie, setSelectedMovie] = React.useState<MovieSuggestion | null>(null);

  return (
    <main className="app">
      <MovieSearch onSelectMovie={setSelectedMovie}/>
      <Recommendations/>
      {/* movieID={selectedMovie?.id ?? null}/> */}
    </main>
  );
}


