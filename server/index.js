const express = require('express');
const connectDB = require('./db/connect')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')

// import routes
const auth = require('./routes/auth');
const drive = require('./routes/drive');

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))



app.get('/',(req,res) => {
    res.status(200).json({msg: 'Welcome To TPC Management System!'})
})


// use routes
app.use('/api/v1/auth',auth)
app.use('/api/v1/drive',drive)



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`The server is listening to http://localhost:${port} ...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()