// src/components/MovieList.js

import React from 'react';

function MovieList({ movies, onMovieSelect }) {
  return (
    <div>
      <h2>Choose a Movie:</h2>
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie.id} onClick={() => onMovieSelect(movie)}>
            <div className="movie-card">
              <img src={movie.posterUrl} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
