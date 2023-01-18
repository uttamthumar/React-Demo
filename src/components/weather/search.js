import React, { useRef } from "react";

export const Search = (props) => {
  const searchInput = useRef();
  return (
    <div className="w-full">
      <input
        type="search"
        value={props.serchData}
        onChange={() => props.eventHandler(searchInput.current.value)}
        ref={searchInput}
        className="border border-black  "
      />
      <button className="btn-primary" onClick={props.searchWeather}>
        Search
      </button>
    </div>
  );
};
