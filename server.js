const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');
const { connectDB } = require('./configs/dbConfig');

const port = process.env.PORT || 8080;

connectDB();

app.listen(port, () => {
  console.log('Server is running on port', port);
});





module.exports = app;
