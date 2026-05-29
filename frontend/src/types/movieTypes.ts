export type MovieSuggestion = {
    id: number;
    title: string;
  };
  
export type MovieDetails = {
    id: number;
    title: string;
    genre: string;
    overview: string;
    similarity: number;
    release_date: string;
    poster_url: string;
};