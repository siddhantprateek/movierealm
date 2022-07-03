const axios = require('axios')

const BASE_URL = 'https://api.themoviedb.org/3/movie/popular'

const GET_MOVIES = async (req, res) => {
    const genre = req.params.genre
    const reqpage = req.params.reqpage
    const page = reqpage ? reqpage : 1;
    try {
        const response = await axios.get(`${BASE_URL}?api_key=${process.env.TMDB_API_KEY}&with_genres=${genre}&page=${page}`)
        res.status(200).send(response.data)
    }catch(err){
        res.status(400).send('unable fetch data')
    }
}

module.exports = GET_MOVIES