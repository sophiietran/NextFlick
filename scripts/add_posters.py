import os
import time 
import requests
import pandas as pd
from dotenv import load_dotenv
from concurrent.futures import ThreadPoolExecutor, as_completed


load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")

if not TMDB_API_KEY:
    raise ValueError("TMDB API KEY not found in .env file")

SEARCH_URL = "https://api.themoviedb.org/3/search/movie"
IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

INPUT = "data/movies.csv"
OUTPUT = "data/movies_with_posters.csv"

def get_poster_url(title: str, release_date: str | None = None) -> str | None:
    
    params = {
        "api_key": TMDB_API_KEY,
        "query": title,
    }
    
    # takes the first 4 characters of the release date (year)
    if release_date and isinstance(release_date, str) and len(release_date) >= 4:
        params["year"] = release_date[:4]
    
    try: 
        response = requests.get(SEARCH_URL, params=params, timeout = 10)
        response.raise_for_status()
        data = response.json()
        
        results = data.get("results", [])
        
        if not results:
            return None
        
        poster_path = results[0].get("poster_path")
        if not poster_path:
            return None
        
        return f"{IMAGE_BASE_URL}{poster_path}"
    except requests.RequestException as error:
        print(f"Error fetching poster for {title}: {error}")
        return None
    
def process_movie(index: int, title: str, release_date: str | None):
    poster_url = get_poster_url(title, release_date)
    return index, poster_url    

def main():
    movies = pd.read_csv(INPUT)
    
    if "poster_url" not in movies.columns:
        movies["poster_url"] = None
    
    tasks = []
     
    # for each row that does not have a poster url, add to task   
    for index, row in movies.iterrows():
        if pd.notna(row["poster_url"]):
            continue
        
        tasks.append((index, row["title"], row.get("release_date")))
    
    # create 10 worker threads   
    with ThreadPoolExecutor(max_workers=10) as executor:
        # array to hold the result of each TMDb result
        futures = [
            # tells a worker thread to call process_movie to call get_poster_url) for each task
            executor.submit(process_movie, index, title, release_date)
            for index, title, release_date in tasks
        ]
        
        # as the worker threads finish, 
        for count, future in enumerate(as_completed(futures), start = 1):
            # put take the result in future and set each index with its url
            index, poster_url = future.result()
            # set poster url in movies at that index
            movies.at[index, "poster_url"] = poster_url
            print(f"Completed {count}/{len(tasks)}")
        
    movies.to_csv(OUTPUT, index = False)
    print(f"Saved updated CSV to {OUTPUT}")

if __name__ == "__main__":
    main()