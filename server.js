const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// configure cors 
let corsOptions = {
    origin: 'http://localhost:3002'
};

app.use(cors(corsOptions));

// configure app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models/index');
db.sequelize.sync();

// db.sequelize.sync({ force: true })
//     .then(() => {
//         console.log(`Drop the sync database.`);
//     }).catch(err => {
//         throw new Error(err.message);
//     });

// simple route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Node.js world :)'
    });
});

require('./routes/tutorial.route')(app);

let port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});