import { createUser, getUser ,loginUser, logout} from '../Controllers/userController.js'
import express from 'express'
import upload from '../Middlewares/imageUpload.js'

const router=express.Router()
router.post('/register',upload.single('image'), createUser)
router.post('/login',loginUser)
router.get('/user',getUser)
router.post('/logout',logout)
export default router


