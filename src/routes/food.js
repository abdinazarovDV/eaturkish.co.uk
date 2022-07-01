import { Router } from 'express';
import  catController from '#controller/food.js'

const router = new Router()

router.post("/",catController.ADD)

export default router
