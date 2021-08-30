require('dotenv').config()
const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      cors = require('cors')


// connect to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

// cors
app.use(cors())

// set server to accept JSON body
app.use(express.json())

// home
app.get('/', function(req, res) {
  res.status(200).json("Server Active")
});

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

// 404
app.get('*', function(req, res){
   res.status(404).send('Sorry, this is an invalid URL.');
});

app.listen(3000, () => {console.log('Server started')})

