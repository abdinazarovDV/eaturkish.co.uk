import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'

import config from '#config/general.config.js'

//import routes
import authRouter from '#route/auth.js'
import catRouter from '#route/category.js'
import foodRouter from '#route/food.js'
import orderRouters from '#route/order.js'



//import middlewares
import db from '#util/postgres.js'


const app = express()

app.use(express.json())
app.use(db)
app.use(fileUpload())
app.use("/images",express.static(path.join(process.cwd(),'images')))

//all routes
app.use('/auth', authRouter)
app.use('/category',catRouter)
app.use('/food',foodRouter)
app.use('/order',orderRouters)

//error handling
app.use((err, req, res, next) => {
    console.log(err);
    return res.json({
        status: 400,
        message: err.message
    })
})

app.listen(config.PORT, () => console.log('http://localhost:' + config.PORT))