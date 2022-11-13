import { Router } from 'express';
import  orderController from '#controller/order.js'
import verify from '#middleware/verify.js'

const router = new Router()

router.post("/", verify.isAuth, orderController.addOrder)
router.put("/admin", verify.isAdmin, orderController.adminViewed)
router.get("/admin", verify.isAdmin, orderController.getOrderToAdmin)


export default router
