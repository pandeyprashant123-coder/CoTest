import React, { useContext, createContext, useState, useEffect } from "react";

const RatingContext = createContext();

export function useRating() {
  return useContext(RatingContext);
}

export function RatingProvider({ children }) {
  const [rating, setRating] = useState([]);

  return (
    <RatingContext.Provider value={{ rating, setRating }}>
      {children}
    </RatingContext.Provider>
  );
}
