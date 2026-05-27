# fastAPI app
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np

from backend.recommender import recommend_movies

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    # add in website URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

movies = pd.read_csv("data/movies_with_posters.csv")
embeddings = np.load("data/embeddings.npy")

class RecommendationRequest(BaseModel):
    movie_id: int

# get the movie ids for the query sent in
@app.get("/movies/search")
def search_movies(q: str):
    matches = movies[
        movies["title"].str.contains(q, case=False, na=False)
    ][["id", "title"]].head(7)

    return {"results": matches.to_dict(orient="records")}

# post or create a list of the recommendations and return a list
@app.post("/recommend")
def recommend(request: RecommendationRequest):
    results = recommend_movies(request.movie_id, movies, embeddings)

    if results is None:
        raise HTTPException(status_code=404, detail="Movie not found")

    return {"recommendations": results}

