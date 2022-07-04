import express from 'express'
import http from 'http'
import fileUpload from 'express-fileupload'
import path from 'path'
import { Server } from 'socket.io'
import cors from 'cors'

import config from '#config/general.config.js'

//import routes
import authRouter from '#route/auth.js' 
import catRouter from '#route/category.js'
import foodRouter from '#route/food.js'
import orderRouters from '#route/order.js'



//import middlewares
import db from '#util/postgres.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(db)
app.use(fileUpload())
app.use("/images",express.static(path.join(process.cwd(),'images')))

//all routes
app.use('/auth', authRouter)
app.use('/category',catRouter)
app.use('/food',foodRouter)
app.use('/order',orderRouter)

//error handling
app.use((err, req, res, next) => {
    console.log(err);
    return res.json({
        status: 400,
        message: err.message
    })
})

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "{POST"]
    }
})

io.on('connection', (message) => {
    
    socketController(io, message)

})


server.listen(config.PORT, () => console.log('http://localhost:' + config.PORT))
