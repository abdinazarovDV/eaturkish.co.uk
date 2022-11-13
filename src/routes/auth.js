import { Router } from 'express';
import  authController from '#controller/auth.js'

const router = new Router()

router
    .route("/registerfirststep")
    .post(authController.registerFirstStep)

router
    .route("/registersecondstep")
    .post(authController.registerSecondStep)

router
    .route("/login")
    .post(authController.login)

router
    .route("/resetpasswordfirststep")
    .post(authController.resetPasswordFirstStep)

router
    .route("/resetpasswordsecondstep")
    .post(authController.resetPasswordSecondStep)

router
    .route("/resetpasswordfinallystep")
    .post(authController.resetPasswordFinallyStep)

router
    .route("/admin/login")
    .post(authController.adminLogin)


export default router