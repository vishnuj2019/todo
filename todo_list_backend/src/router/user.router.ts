import express from 'express'
import { forgetPassword, login, logout, signup, verifyUsername } from '../controller/user.controller'
import { decodeToken } from '../middleware/VerfiyMiddleware'

const user_router = express.Router()


user_router.route('/signup').post(signup)
user_router.route('/login').post(login)
user_router.route('/verifyUser').post(verifyUsername)
user_router.route('/forgetPassword/:id').post(forgetPassword)
user_router.route('/logout').post(logout)
user_router.route('/decodeUser').get(decodeToken)


export default user_router