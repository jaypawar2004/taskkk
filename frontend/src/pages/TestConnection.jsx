import React, { useEffect } from 'react';
// Example using fetch (React or Vanilla JS)
fetch('http://localhost:5000/api/test')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Expected: { message: "Backend is connected successfully!" }
  })
  .catch(error => {
    console.error('Error:', error); // Handle connection issues
  });


const App = () => {
  useEffect(() => {
    fetch('http://localhost:5000/api/test')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check backend response in console
      })
      .catch(error => {
        console.error('Error:', error); // If there's an error (e.g., backend not reachable)
      });
  }, []);

  return <div className="App">Check the console for backend response!</div>;
}

export default App;
