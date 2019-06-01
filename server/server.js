const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require('./config/config');
const db = require('./db/db');
const PORT = 3000;

// Load routes
const auth = require('./routes/auth/auth');

// Body parser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

db.connect(config.mongoUri);

// Load routes middleware
app.use('/api/auth', auth);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on ${PORT} port`);
});