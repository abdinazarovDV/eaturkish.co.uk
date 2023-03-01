import { Router } from 'express';
import  catController from '#controller/food.js'
import verify from '#middleware/verify.js'

const router = new Router()

router.post("/",verify.isAdmin,catController.ADD)
router.get("/",catController.GET)
router.put("/",verify.isAdmin,catController.UPDATE)
router.delete("/:food_id",verify.isAdmin,catController.DELETE)




export default router
