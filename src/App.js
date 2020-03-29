import React, { useState } from "react";
import axios from "axios";

import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const apiurl =
    "https://api.themoviedb.org/3/search/movie?api_key=bceb2fb925a7c070559ea5c3b1c68582&language=en-US";

  const search = e => {
    if (e.key === "Enter") {
      axios(apiurl + "&query=" + state.s + "&page=1&include_adult=false").then(
        ({ data }) => {
          let results = data.results;
          //console.log(Object.keys(results));
          //console.log(results);
          //console.log(data.results.);
          //get_similiar(results.id);
          setState(prevState => {
            return { ...prevState, results: results };
          });
        }
      );
    }
  };
  const handleInput = e => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s };
    });
  };

  const openPopup = id => {
    axios(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=bceb2fb925a7c070559ea5c3b1c68582&language=en-US"
    ).then(({ data }) => {
      let result = data;
      //  console.log(result);
      setState(prevState => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
      <header>
        <h1>#StayAtHome</h1>
        <h2>
          Please stay at home to protect your commmunity against COVID-19.
        </h2>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />

        {typeof state.selected.original_title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>
    </div>
  );
}

export default App;
