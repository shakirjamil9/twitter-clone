const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB_URI = process.env.DB_URI.replace(
  /<password>/,
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Database Connection Successful');
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
