import {getOrders,createOrder} from '../Controllers/orderController.js'
import express from 'express'
const router=express.Router()
router.post('/order',createOrder)
router.get('/order',getOrders)
export default router


