
import Contact from "../Models/contact.js";
export const creatContact=async (req,res)=>{
  try {
    const { name, email, message } = req.body;  
    if (!name ) {
      return res.status(400).json({ error: 'Please fill  name' });
    }
    if(!email||email.length<12){
      return res.status(400).json({ error: 'Please check your email, email is incorrect, length >12.' });
    }
    if(!message){
      return res.status(400).json({ error: 'Please fill email.' });
    }
    const contacts = new Contact({ name, email, message });
    await contacts.save(); 
    res.status(201).json(contacts);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'An error occurred while creating the contact.' });
  }
}
export const getContact=async (req, res)=>{
    try {
        const query = {}; 
        const contacts = await Contact.find(query);
    
        if (!contacts) {
          return res.status(404).json({ message: 'No contacts found' });
        }
    
        res.status(200).json(contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error.message);
        res.status(500).json({ message: 'Server error' });
      }
}