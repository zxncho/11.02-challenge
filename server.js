const express = require("express");
const api = require("./routes/apiRoutes");
const html = require("./routes/htmlRoutes");
const values = require("./db/values");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json(values));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);
app.use('/', html);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));