const express = require('express')
const GET_MOVIES = require('../controllers/movie.controllers')
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        await res.status(200).send('Server is running 🚀')        
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/:genre/:reqpage', GET_MOVIES)
router.get('/:genre', GET_MOVIES)
module.exports = router