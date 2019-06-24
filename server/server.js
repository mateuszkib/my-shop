const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require("passport");

const config = require('./config/config');
const db = require('./db/db');
const PORT = 3000;

// Load routes
const auth = require('./routes/auth/auth');
const user = require('./routes/public/users/users');
const advertisement = require('./routes/private/advertisement/advertisement');

// Body parser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Load Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// DB Connected
db.connect(config.mongoUri);

// Load routes middleware
app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/advertisement', advertisement);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on ${PORT} port`);
});