import mongoose from 'mongoose'
const OrderSchema = new mongoose.Schema({
    confirmOrder:{
        type:Number,
        default:0
    },
    orderComplete:{
        type:Number,
        default:0
    },
    confirmPayment:{
        type:Number,
        default:0
    },
    phoneNumber: {
        type: Number,
      },
      customerName: {
        type: String,
      },
      customerEmail: {
        type: String,
      },
      tableNumber: {
        type: Number,
        required: true
      },
  food: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
   
    subtotal: {
      type: Number,
      required: true
    }
  }],
  total:{
    type:Number,
    required:true
  }
});
export default mongoose.model('orders',OrderSchema)
