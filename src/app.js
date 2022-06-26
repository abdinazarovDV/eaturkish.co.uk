import express from 'express'

import config from '#config/general.config.js'

//import routes
import authRouter from '#route/auth.js'


//import middlewares
import db from '#util/postgres.js'


const app = express()

app.use(express.json())
app.use(db)


//all routes
app.use('/auth', authRouter)

//error handling
app.use((err, req, res, next) => {
    console.log(err);
    return res.json({
        status: 400,
        message: err.message
    })
})

app.listen(config.PORT, () => console.log('http://localhost:' + config.PORT))