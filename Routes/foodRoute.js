import {creatFoodapi,getFoodapi,getPopular,increaseLove} from '../Controllers/foodapiController.js'
import express from 'express'
import upload from '../Middlewares/imageUpload.js'

const router=express.Router()
router.put('/love/:foodId', async (req, res) => {
    const { foodId } = req.params;
    try {
      const updatedFoodItem = await increaseLove(foodId);
      res.status(200).json(updatedFoodItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
router.post('/foodapi',upload.single('image'), creatFoodapi)
router.get('/foodapi',getFoodapi)
router.get('/popular',getPopular)

export default router


