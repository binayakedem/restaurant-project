import { creatContact,getContact } from '../Controllers/contactController.js'
import express from 'express'
const router=express.Router()
router.post('/contact', creatContact)
router.get('/contact',getContact)
export default router


