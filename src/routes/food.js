import { Router } from 'express';
import  catController from '#controller/food.js'

const router = new Router()

router.post("/",catController.ADD)
router.get("/",catController.GET)
router.put("/",catController.UPDATE)
router.delete("/:food_id",catController.DELETE)




export default router
