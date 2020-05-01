const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const routes = require('./routes');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/users', routes.user);

app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`));
