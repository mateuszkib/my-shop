const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");

const config = require("./config/config");
const db = require("./db/db");
const PORT = 3000;

// Load routes
const auth = require("./routes/auth/auth");
const user = require("./routes/public/users/users");
const announcement = require("./routes/public/announcement/announcement");
const categories = require("./routes/public/categories/categories");

const privateAnnouncementRoutes = require("./routes/private/announcement/announcement");
const privateUserRoutes = require("./routes/private/user/user");
const privateCategories = require("./routes/private/categories/categories");

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

// Public routes
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/announcement", announcement);
app.use("/api/categories", categories);

// Private routes
app.use("/api/private/announcement", privateAnnouncementRoutes);
app.use("/api/private/categories", privateCategories);
app.use("/api/private/user", privateUserRoutes);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on ${PORT} port`);
});
