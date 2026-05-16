
export default function Hero(){
    return(

        <section className="hero">

        <h1 className="hero__title">NextFlick</h1>
        <p className="hero__subtitle">
          a movie recommender system for your next watch
        </p>

        <form className="hero__search" onSubmit={(e) => e.preventDefault()}>
          
          <input
            className="hero__input"
            type="text"
            placeholder="Enter a movie you like"
            aria-label="Movie input"
          />

          <button className="hero__button" type="submit">
            Search
          </button>
          
        </form>


      </section>

    );
}