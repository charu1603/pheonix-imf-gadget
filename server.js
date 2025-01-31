const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes');
const gadgetRoutes = require('./src/routes/gadgetRoutes');
const authenticate = require('./src/middleware/authMiddleware');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use('/auth', authRoutes);
app.use('/api', gadgetRoutes);
app.get("/", (req, res) => {

    res.send("Hello world");
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});