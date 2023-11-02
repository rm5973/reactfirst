// MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { title, imageUrl, rating, language } = movie;
  console.log('Rating:', rating);
  return (
    <div className="rounded-lg shadow-md bg-white p-4 m-2 w-64">
      <img src={imageUrl} alt={title} className="w-full h-auto rounded-lg" />
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-gray-600">Rating: {rating}/5</p>
      <p className="text-gray-600">Language: {language}</p>
      <Link to={`/booking/${title}`} className="text-blue-600 hover:underline">
        Book Now
      </Link>
    </div>
  );
};

export default MovieCard;
