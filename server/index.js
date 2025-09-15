const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Mock user database
const users = [
  { id: 1, email: 'user@example.com', password: 'password123', name: 'John Doe' },
  { id: 2, email: 'alice@example.com', password: 'alice123', name: 'Alice Smith' },
];

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Return user data without password
    const { password, ...userData } = user;
    res.json(userData);
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});