const express = require('express')
const router = express.Router()

router.get('/', (req, res)=> {
    res.send('Running')
    res.end()
})

module.exports = router