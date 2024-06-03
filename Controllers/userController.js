import userSchema from '../Models/users.js'
import { hashPassword,comparePassword } from '../Helpers/auth.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const secrete=process.env.JWT_SECRETE;
export const createUser=async (req,res)=>{
    try{
        const{name, phone, email, password,role}=req.body
        if (!name ) {
          return res.status(400).json({ error: 'Please fill  name' });
        }
        if (!phone) {
            return res.status(400).json({ error: 'Please fill  phone number' });
          }
          if (!email ) {
            return res.status(400).json({ error: 'Please fill  email' });
          }
          if (!password || password.length<5) {
            return res.status(400).json({ error: 'Password must be more than 6 characters' });
          }
          const checkEmail=await userSchema.findOne({email});
          if(checkEmail){
            return res.status(400).json({
              error:"Email is taken already"
            })
          }
          const hashedPassword=await hashPassword(password);
        const image=req.file.filename;
        const users=new userSchema({name, phone, email,password:hashedPassword,role, image});
        users.save();
        res.status(201).json(users);
      }catch(error){
        res.status(500).json({error:error.message})
    }
}
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.json({ error: 'User is not found. Register now!!!.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ email: user.email, id: user._id, name: user.name,role: user.role ,image:user.image,phone:user.phone }, secrete, { expiresIn: '30d' });
      return res.json({ token ,message:'Login successfully',useremail:user.email});
    } else {
      return res.json({ error: 'Password is not match.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};


export const logout = async (req, res) => {
  let revokedTokens = []; 
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      revokedTokens.push(token);

      res.status(200).json({ message: 'Successfully logged out.', status: true }); 
    } else {
      res.status(401).json({ message: 'Unauthorized', status: false }); 
    }
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal server error.', status: false });
  }
}



export const getUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' }); 
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secrete);
    res.json({ email: decoded.email, id: decoded._id, name: decoded.name ,role: decoded.role,image:decoded.image,phone:decoded.phone}); 
  } catch (err) {
    res.status(403).json({ error: 'Forbidden' }); 
  }
};
