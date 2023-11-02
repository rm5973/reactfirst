import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard'); // Default to Credit Card
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [upiID, setUPIID] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const { language, selectedSeats } = useParams();
  const { movieTitle } = useParams();

  // Ensure that selectedSeats is defined and convert it to an array
  const selectedSeatsArray = selectedSeats ? selectedSeats.split('-') : [];

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePayment = () => {
    // Ask the user for their username
    const userId = prompt('Please enter your username:');
    if (!userId) {
      alert('Username is required. Please try again.');
      return;
    }
  
    // Loop through each selected seat and send a separate POST request
    selectedSeatsArray.forEach(seat => {
      const data = {
        userId,
        movieName: movieTitle,
        seatSelected: seat,
      };
  
      // Make a POST request to your API endpoint to store the data for this seat
      axios.post('http://localhost:8000/api/storePayment', data)
        .then(response => {
          console.log(`Data for seat ${seat} stored successfully:`, response.data.message);
        })
        .catch(error => {
          console.error(`Error storing data for seat ${seat}:`, error);
        });
    });
  
    alert('Payment successful!');
  };
  

  const handlePaymentWithParams = () => {
    // Ask the user for their username
    
    

    handlePayment( movieTitle, selectedSeatsArray);
  };

  return (
    <div className="bg-white p-4 border rounded shadow-md m-4">
      <h2 className="text-xl font-bold">Payment Details</h2>

      <p>Movie: {movieTitle}</p>
      <p>Language: {language}</p>
      {selectedSeatsArray.length > 0 && (
        <p>Selected Seats: {selectedSeatsArray.join(', ')}</p>
      )}

      <div className="mt-4">
        <label>
          <input
            type="radio"
            value="creditCard"
            checked={paymentMethod === 'creditCard'}
            onChange={() => handlePaymentMethodChange('creditCard')}
          />
          Credit Card
        </label>
        <label>
          <input
            type="radio"
            value="upiPayment"
            checked={paymentMethod === 'upiPayment'}
            onChange={() => handlePaymentMethodChange('upiPayment')}
          />
          UPI Payment
        </label>
        <label>
          <input
            type="radio"
            value="netBanking"
            checked={paymentMethod === 'netBanking'}
            onChange={() => handlePaymentMethodChange('netBanking')}
          />
          Net Banking
        </label>
      </div>
      {paymentMethod === 'creditCard' && (
        <div>
          <label>
            Card Number:
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="border border-gray-300" />
          </label>
          <label>
            Expiration Date:
            <input type="text" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} className="border border-gray-300" />
          </label>
          <label>
            CVV:
            <input type="text" value={cvv} onChange={(e) => setCVV(e.target.value)} className="border border-gray-300" />
          </label>
          <label>
            Name on Card:
            <input type="text" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} className="border border-gray-300" />
          </label>
        </div>
      )}
      {paymentMethod === 'upiPayment' && (
        <div>
          <label>
            UPI ID:
            <input type="text" value={upiID} onChange={(e) => setUPIID(e.target.value)} className="border border-gray-300" />
          </label>
        </div>
      )}
      {paymentMethod === 'netBanking' && (
        <div>
          <label>
            Select Bank:
            <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} className="border border-gray-300">
              <option value="">Select a bank</option>
              <option value="bank1">Bank 1</option>
              <option value="bank2">Bank 2</option>
              <option value="bank3">Bank 3</option>
            </select>
          </label>
        </div>
      )}
      <button onClick={handlePaymentWithParams} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
