import { Router } from 'express';
import  orderController from '#controller/order.js'

const router = new Router()

router.post("/", orderController.addOrder)
router.put("/admin", orderController.adminViewed)
router.get("/admin",orderController.getOrderToAdmin)


export default router
