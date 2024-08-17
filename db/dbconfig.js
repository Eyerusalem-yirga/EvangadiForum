require("dotenv").config();
const mysql = require("mysql2");

// Create a connection using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// -- Creating the `profile` table
// CREATE TABLE profile (
//   user_profile_id INT AUTO_INCREMENT PRIMARY KEY, -- Primary Key
//   user_id INT, -- Foreign Key
//   first_name VARCHAR(255) NOT NULL,
//   last_name VARCHAR(255) NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES registration(user_id) -- Foreign Key constraint
// );

// -- Creating the `registration` table
// CREATE TABLE registration (
//   user_id INT AUTO_INCREMENT PRIMARY KEY, -- Primary Key
//   user_name VARCHAR(255) NOT NULL UNIQUE, -- Unique constraint
//   user_email VARCHAR(255) NOT NULL UNIQUE, -- Unique constraint
//   pass VARCHAR(255) NOT NULL
// );

// -- Creating the `question` table
// CREATE TABLE question (
//   question_id INT AUTO_INCREMENT PRIMARY KEY, -- Primary Key
//   question TEXT NOT NULL,
//   question_description TEXT,
//   user_id INT, -- Foreign Key
//   post_id VARCHAR(255) UNIQUE, -- Unique constraint
//   FOREIGN KEY (user_id) REFERENCES registration(user_id) -- Foreign Key constraint
// );

// -- Creating the `answer` table
// CREATE TABLE answer (
//   answer_id INT AUTO_INCREMENT PRIMARY KEY, -- Primary Key
//   answer TEXT NOT NULL,
//   user_id INT, -- Foreign Key
//   question_id INT, -- Foreign Key
//   FOREIGN KEY (user_id) REFERENCES registration(user_id), -- Foreign Key constraint
//   FOREIGN KEY (question_id) REFERENCES question(question_id) -- Foreign Key constraint
// );

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");

  // Query to select all rows from the 'test' table
  //   const query = "select * from test";
  const query = `
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    user_id INT,
    post_id VARCHAR(255) UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
  );
        `;

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }

    //     // Log the results
    console.log("Results:", results);

    // Close the connection
    // connection.end((err) => {
    //   if (err) {
    //     console.error("Error ending the connection:", err);
    //   } else {
    //     console.log("Connection closed.");
    //   }
    // });
  });
});

module.exports = connection.promise();
