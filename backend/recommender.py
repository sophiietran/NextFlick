# takes in movie id, runs the recommender, and return recommendations

from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


def recommend_movies(movie_id, movies, embeddings, top_n=10):
    match = movies[movies["id"] == movie_id]

    if match.empty:
        return None

    idx = match.index[0]
    query_vector = embeddings[idx].reshape(1, -1)

    similarities = cosine_similarity(query_vector, embeddings)[0]

    top_indices = np.argsort(similarities)[::-1]
    top_indices = [i for i in top_indices if i != idx][:top_n]

    results = movies.iloc[top_indices][["id", "title", "genre", "overview", "release_date", "poster_url"]].copy()
    results["similarity"] = similarities[top_indices]

    return results.to_dict(orient="records") # convert dataframe into dictionary