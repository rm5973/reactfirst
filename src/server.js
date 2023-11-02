const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { response } = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 8000; // Replace with your desired port
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`Received a ${req.method} request at ${req.url}`);
  next(); // Make sure to call next to continue processing the request
});
// Create a MySQL database connection
var db = mysql.createConnection({
  host: 'localhost',  // Replace with your MySQL server's hostname
  user: 'root',  // Replace with your MySQL username
  password: '1339',  // Replace with your MySQL password
  database: 'minor_proj',  // Replace with the name of your database
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define a route to fetch movie data
app.get('/api/movies', (req, res) => {
  // Perform an SQL query to retrieve movie data
  const query = 'SELECT * FROM movie_name'; // Replace 'movies' with your actual table name

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      console.log (results)
    }
  });
});


 // Your existing Express.js route
app.post('/api/storePayment', (req, res) => {
  const data = req.body;

  console.log('Data received:', data);

  const query = 'INSERT INTO booking_details (userId, movie_name, seat_no) VALUES (?, ?, ?)';
  const values = [data.userId, data.movieName, data.seatSelected];

  // Use your existing database connection
  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error inserting data: ' + error.message);
      return res.status(500).json({ message: 'Error inserting data into the database' });
    }

    console.log('Data inserted successfully');
    res.status(200).json({ message: 'Data successfully received and inserted' });
  });
    
   
  }
 
);

app.get('/api/occupiedSeats', (req, res) => {
  // Query to fetch seat numbers from the booking_details table
  const query = 'SELECT seat_no FROM booking_details';

  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching occupied seats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Extract seat numbers from the results
      const occupiedSeats = results.map((row) => row.seat_no);

      // Respond with the list of occupied seat numbers
      res.status(200).json({ occupiedSeats });
    }
  });
});

  
  // You can now use this data to insert it into your SQL database
  // Perform the database insertion here

  // Send a response back to the client
  


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
