import React from "react";

function Result({ result, openPopup }) {
  return (
    <div className="result">
      <div className="ui card" onClick={() => openPopup(result.id)}>
        <div class="ui move reveal image">
          <img
            src={
              "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
              result.poster_path
            }
          />
        </div>
        <div className="content">
          <h3>{result.title}</h3>
        </div>
      </div>
    </div>
  );
}

export default Result;
