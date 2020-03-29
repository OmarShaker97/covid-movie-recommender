import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";

function Popup({ selected, closePopup }) {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  axios(
    "https://api.themoviedb.org/3/movie/" +
      selected.id +
      "/similar?api_key=bceb2fb925a7c070559ea5c3b1c68582&language=en-US&page=1"
  ).then(({ data }) => {
    let results = data.results;

    //    console.log(state);
    setState(prevState => {
      return { ...prevState, results: results };
    });
  });

  const openPopup = id => {
    axios(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=bceb2fb925a7c070559ea5c3b1c68582&language=en-US"
    ).then(({ data }) => {
      let result = data;
      //    console.log(result);
      setState(prevState => {
        return { ...prevState, selected: result };
      });
    });
  };

  return (
    <section className="popup">
      <div className="content">
        <h2>
          {selected.title + " "}
          <span>({selected.release_date})</span>
        </h2>
        <p className="rating">Rating: {selected.vote_average}</p>
        <div className="plot">
          <img
            src={
              "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
              selected.poster_path
            }
          />
          <p>{selected.overview}</p>
        </div>
        <button className="close" onClick={closePopup}>
          Close
        </button>
      </div>
      <main>
        <header>
          <h2>Similar Movies</h2>
        </header>
        <Results results={state.results} openPopup={openPopup} />
      </main>
    </section>
  );
}

export default Popup;
