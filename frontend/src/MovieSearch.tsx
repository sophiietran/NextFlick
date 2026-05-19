// return the movie that user chose

import React from "react";

type MovieSuggestion = {
  id: number;
  title: string;
};

type MovieSearchProps = {
  onSelectMovie: (movie:MovieSuggestion) => void;
}

export default function MovieSearch({ onSelectMovie }: MovieSearchProps) {

  const [query, setQuery] = React.useState<string>("");
  const [suggestions, setSuggestions] = React.useState<MovieSuggestion[]>([]);
  const [chosenMovie, setChosenMovie] = React.useState<MovieSuggestion | null>(null);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    setChosenMovie(null);
    setHighlightedIndex(-1);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/movies/search?q=${encodeURIComponent(value)}`
      );
      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  }

  function handleSelect(movie: MovieSuggestion){
    setQuery(movie.title);
    setChosenMovie(movie);
    setSuggestions([]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    if(!chosenMovie){
      return;
    }

    onSelectMovie(chosenMovie);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (suggestions.length === 0) 
      return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1,
      );
    }

    if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[highlightedIndex]);
    }
  }
  
  

  return (
    <section className="hero">
      <h1 className="hero-title">NextFlick</h1>

      <p className="hero-subtitle">
        a movie recommender system for your next watch
      </p>

      <form className="hero-search" onSubmit={handleSubmit}>
        <input
          className="hero-input"
          type="text"
          placeholder="Enter a movie you like"
          aria-label="Movie input"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button className="hero-button" type="submit">
          Recommend!
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="ms-suggestions">
          {suggestions.map((movie, index) => (
            <li key={movie.id} 
                className={`ms-suggestion-item ${index === highlightedIndex ? "is-active" : ""}`}
                onClick={() => handleSelect(movie)}>
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}