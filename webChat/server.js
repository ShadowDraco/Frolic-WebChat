const express = require('express')
const app = express()

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

const port = 5000

const mongoose = require('mongoose')
require('dotenv').config()
const mongoURI = process.env.MONGO_URI

let db

async function connect() {
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    db = mongoose.connection
    console.log('database connected')
}


app.use(express.json())

app.get('/', (req, res) => {
    console.log('home')
})

const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.listen(port, (req, res) => {
    console.log('listening on port', port)
    connect()
})

exports.db = db