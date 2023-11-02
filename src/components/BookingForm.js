import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BookingForm = ({ title, language }) => {
  const numRows = 10;
  const numCols = 8;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  // Simulate fetching occupied seats from an API
  useEffect(() => {
    // Replace this with an actual API call to get occupied seats
    // For now, let's assume that the occupiedSeats API returns an array of occupied seat keys.
    fetch('http://localhost:8000/api/occupiedSeats')
      .then((response) => response.json())
      .then((data) => { console.log(data)
        setOccupiedSeats(data.occupiedSeats);
      });
  }, []);

  const handleSeatSelection = (rowIndex, colIndex) => {
    const seatKey = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;

    if (occupiedSeats.includes(seatKey)) {
      // The seat is occupied, do not allow selection
      return;
    }

    if (selectedSeats.includes(seatKey)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatKey));
    } else {
      setSelectedSeats([...selectedSeats, seatKey]);
    }
  };

  return (
    <div className="bg-white p-4 border rounded shadow-md m-4">
      <h2 className="text-xl font-bold">Booking Form</h2>
      <p>Movie: {title}</p>
      <p>Language: {language}</p>

      <div className="grid grid-cols-9 gap-4">
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <>
            <div key={rowIndex} className="w-12 h-12 flex items-center justify-center font-bold">
              {String.fromCharCode(65 + rowIndex)}
            </div>
            {Array.from({ length: numCols }).map((_, colIndex) => {
              const seatKey = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
              const isSeatSelected = selectedSeats.includes(seatKey);
              const isSeatOccupied = occupiedSeats.includes(seatKey);

              return (
                <div
                  key={colIndex}
                  className={`w-12 h-12 flex flex-col items-center justify-center cursor-pointer`}
                  style={{
                    border: '1px solid #e2e8f0',
                    color: isSeatOccupied ? 'red' : isSeatSelected ? 'green' : 'gray',
                  }}
                  onClick={() => handleSeatSelection(rowIndex, colIndex)}
                >
                  <i className="material-icons text-xl">event_seat</i>
                  <span className="text-xs">{colIndex + 1}</span>
                  <span className="text-xs">
                    {String.fromCharCode(65 + rowIndex)}
                    {colIndex + 1}
                  </span>
                </div>
              );
            })}
          </>
        ))}
      </div>

      <Link to={`/payment/${title}/${language}/${selectedSeats.join('-')}`}>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">Proceed</button>
      </Link>
    </div>
  );
};

export default BookingForm;
