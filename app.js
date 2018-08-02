const express = require('express'),
      app     = express();

app.use(express.static(`${__dirname}/public`));
const port = process.env.PORT || 1337;
// app.get('/', (req, res) => {

// });

app.listen(port, () => console.log(`Chat app running on port ${port}`));