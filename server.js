// require('./global_functions'); 
const fs = require('fs');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.listen(process.env.port || 4000, function() {

  require('./utils/db');
  
  fs.readdirSync(path.join(__dirname, 'models')).map(file => {
		require('./models/' + file)(app);
  });
  
    console.log('I am listening!');
});

