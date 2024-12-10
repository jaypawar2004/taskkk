// index.js
const app = require('./app'); // Assuming your main app logic is in 'app.js'
const port = process.env.PORT || 5000;

app.get('/api/test', (req, res) => {
  res.json({ message: "Backend is connected successfully!" });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
