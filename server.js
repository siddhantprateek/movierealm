// imports
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const router = require('./routes/movie.routes');
const auth_route = require('./routes/auth.routes')

// app configuration
const PORT = process.env.PORT || 4000
const app = express()
dotenv.config()

// middlware 
app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(express.json())
app.use(cookieParser())



// routes
app.use('/v1/api', router)
app.use('/api', auth_route)


// database connection
const database_connection = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log('Connection to the Atlas Cluster is successful!')
        })
        .catch((err) => console.error(err));

    const db = mongoose.connection
    db.once('open', () => {
        console.log('database connection is successful')
    })

}
database_connection()

// Server listen
app.listen(PORT, () => {
    console.log(`server running at 🚀 http://localhost:${PORT}`)
})