require('dotenv').config()
const express = require('express'),
      app = express(),
      mongoose = require('mongoose')


// connect to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))


// set server to accept JSON body
app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(8080, () => {console.log('Server started')})

