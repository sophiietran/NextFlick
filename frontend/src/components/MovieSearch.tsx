import { useState } from "react";
import type { ChangeEvent } from "react";

type MovieSuggestion = {
  id: number;
  title: string;
};

export default function MovieSearch() {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<MovieSuggestion[]>([]);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);

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

  return (
    <section className="hero">
      <h1 className="hero-title">NextFlick</h1>
      <p className="hero-subtitle">
        a movie recommender system for your next watch
      </p>

      <form className="hero-search" onSubmit={(e) => e.preventDefault()}>
        <input
          className="hero-input"
          type="text"
          placeholder="Enter a movie you like"
          aria-label="Movie input"
          value={query}
          onChange={handleChange}
        />

        <button className="hero-button" type="submit">
          Search
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="ms-suggestions">
          {suggestions.map((movie) => (
            <li key={movie.id} className="ms-suggestion-item">
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}