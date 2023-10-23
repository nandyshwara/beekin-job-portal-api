const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { baseRoute } = require('./utils/baseRoutes');
dotenv.config({ path: './.env' });
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(baseRoute + '/users', require("./routes/userRoutes"));
app.use(baseRoute + '/jobs', require("./routes/jobRoutes"));
app.use(baseRoute + '/application', require("./routes/userApplicationRoutes"));


module.exports = app