const express = require('express');

const port = process.env.PORT || 8081

const app = express();

app.listen(port, () => console.log(`Running on http://localhost:${port}`))
