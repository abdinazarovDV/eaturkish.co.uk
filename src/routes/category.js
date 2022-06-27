import { Router } from 'express';
import  catController from '#controller/category.js'

const router = new Router()

router.post("/",catController.ADD)
router.get("/",catController.GET)
router.delete("/:category_id",catController.DELETE)
router.put("/",catController.UPDATE)




export default router
