import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import MovieCard from './components/MovieCard';
import UserProfile from './components/UserProfile';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import BookingForm from './components/BookingForm';
import PaymentPage from './components/PaymentPage';

function App() {
  const [user, setUser] = useState(null);
  const [movieData, setMovieData] = useState([]); // State to store movie data

  useEffect(() => {
    // Fetch movie data from your backend API using Axios
    axios.get('http://localhost:8000/api/movies') // Replace with the actual API endpoint
      .then((response) => {
        const data = response.data;
        console.log('Fetched data:', data);

        // Map the property names to match your component's expectations
        const mappedData = data.map((movie) => ({
          title: movie.Name,
          language: movie.language,
          rating:movie.rating,
        }));
        
        setMovieData(mappedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Movie Ticket Booking</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            {user ? (
              <li><Link to="/booking">Book Tickets</Link></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
            <li>
              <Link to="/registration">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={
            user ? (
              <UserProfile user={user} />
            ) : (
              <div>
                <h2>Login or Register</h2>
              </div>
            )
          } />
          <Route path="/profile" element={<UserProfile user={user} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/booking/:movieTitle" element={<BookingPage movieData={movieData} />} />
          <Route
  path="/payment/:movieTitle/:language/:selectedSeats"
  element={
    <PaymentPage title={movieData} />
  }
/>
        </Routes>
        <div className="flex flex-wrap">
          {movieData.map((movie) => (
            <div key={movie.title} className="w-1/4 p-2">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </Router>
  );
}

function BookingPage({ movieData }) {
  const { movieTitle } = useParams();
  const selectedMovie = movieData.find((movie) => movie.title === movieTitle);

  if (!selectedMovie) {
    return <div>Movie not found</div>;
  }

  return <BookingForm title={selectedMovie.title} language={selectedMovie.language} />;
}

export default App;
