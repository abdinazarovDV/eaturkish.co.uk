import { Router } from 'express';
import  userController from '#controller/user.js'

const router = new Router()

router.put("/", userController.editUser)


export default router
