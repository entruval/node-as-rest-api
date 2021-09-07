const express = require('express'),
      mongoose = require('mongoose'),
      dotenv = require('dotenv').config(),
      cors = require('cors'),
      app = express()
const HOSTNAME = require('os').networkInterfaces().en0[0].address



// handlers
const subscribersRouter = require('./routes/subscribers')


// connect to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

// cors
let origin = process.env.NODE_ENV === "production" ? "*" : "*"
app.use(cors({
  "origin": origin,
  "methods": ["GET","PUT","PATCH","POST","DELETE"],
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

// set server to accept JSON body
app.use(express.json())

// home
app.get('/', function(req, res) {
  res.status(200).json("Server Active")
});

app.use('/subscribers', subscribersRouter)

// 404
app.get('*', function(req, res){
   res.status(404).send('Sorry, this is an invalid URL.');
});

app.listen(3000, HOSTNAME, () => {console.log('Server active')})

