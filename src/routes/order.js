import { Router } from 'express';
import  orderController from '#controller/order.js'

const router = new Router()

router.post("/", orderController.addOrder)
router.post("/admin", orderController.adminViewed)
// router.get("/",catController.GET)


export default router
