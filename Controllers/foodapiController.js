import foodApi from "../Models/foodApi.js";

export const creatFoodapi=async (req,res)=>{
    try{
        const{name, price, category, description,love}=req.body
        const image=req.file.filename;
        const foodapi=new foodApi({name, price, category,description,love, image});
        foodapi.save();
        res.status(201).json(foodapi);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
export const increaseLove = async (foodId) => {
    try {
      const updatedFood = await foodApi.findByIdAndUpdate(
        foodId,
        { $inc: { love: 1 } }, 
        { new: true } 
      );
  
      if (!updatedFood) {
        throw new Error('Food item not found');
      }
  
      return updatedFood;
    } catch (error) {
      console.error('Error increasing love:', error.message); 
      throw new Error(`Failed to increase love: ${error.message}`); 
    }
  };
  
export const getFoodapi=async (req, res)=>{
    const { category } = req.query; 
  let query = {};
  if (category) {
    query.category = category; 
  }
  try {
    const foods = await foodApi.find(query);
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
}
export const getPopular=async (req, res)=>{
try {
  const items = await foodApi.find().sort({ love: -1 }).limit(8); 
res.json(items);
} catch (error) {
  console.error('Error fetching foods:', error.message);
  res.status(500).json({ message: 'Server error' });
}
}