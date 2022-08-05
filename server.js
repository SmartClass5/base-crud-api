const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require('mongoose');
const app = express();
// const tweetRoute = require('./router/tweets.js)'
const Routers = require('./routes/routes.js');
const { mongourl } = require("../auth-api/config/config.js");


app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

mongoose.connect(`${mongourl}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use('/custom-api', Routers);

app.get('/test', (req,res)=>{
    return res.json({msg:"test"})
});
app.use((req, res, next) => {
    res.status(404).send('Not found')
})

app.use((error,req, res, next) => {
    console.log(error);
    res.status(500).send('internal server Error')
})
app.listen(30003);