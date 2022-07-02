import { Router } from 'express';
import  orderController from '#controller/order.js'

const router = new Router()

router.post("/", orderController.ADD)
// router.get("/",catController.GET)


export default router
