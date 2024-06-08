const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const dotenv = require('dotenv');

dotenv.config();

const userServiceRoutes = require('./userService/route');
const authRoutes = require('./auth/route');

app.use(express.json());

// Mount the user service routes at /users endpoint
app.use('/users', userServiceRoutes);

// Mount the auth service routes at /auth endpoint
app.use('/auth', authRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
