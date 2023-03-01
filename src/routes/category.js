import { Router } from 'express';
import  catController from '#controller/category.js'
import verify from '#middleware/verify.js'

const router = new Router()

router.post("/",verify.isAdmin,catController.ADD)
router.get("/",catController.GET)
router.delete("/:category_id",verify.isAdmin,catController.DELETE)
router.put("/",verify.isAdmin,catController.UPDATE)




export default router
