# fastAPI app
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np

from backend.recommender import recommend_movies

app = FastAPI()

movies = pd.read_csv("data/movies.csv")
embeddings = np.load("data/embeddings.npy")

class RecommendationRequest(BaseModel):
    movie_id: int

@app.get("/movies/search")
def search_movies(q: str):
    matches = movies[
        movies["title"].str.contains(q, case=False, na=False)
    ][["id", "title"]].head(10)

    return {"results": matches.to_dict(orient="records")}

@app.post("/recommend")
def recommend(request: RecommendationRequest):
    results = recommend_movies(request.movie_id, movies, embeddings)

    if results is None:
        raise HTTPException(status_code=404, detail="Movie not found")

    return {"recommendations": results}

