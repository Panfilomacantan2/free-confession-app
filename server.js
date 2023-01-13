const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const { initializedDB } = require('./Connection');
const bodyParser = require('body-parser');

dotenv.config();
initializedDB();


app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', require('./routes/posts'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
