import express from 'express'
import connectDb from './config/connectDB'
import Contact from './model/Contact'
//ket noi voi csdl mongodb voi host 27017
connectDb();
let app = express();
app.listen(3000,'localhost',()=>(
  console.log("Server is running on host 3000")
))
app.get('/', async (req,res)=>{   
  try {
    let item={
      userId:"0000000000000000000000000000",
      contactId:"00000000000000000000000000"
    }
    let contact = await Contact.create(item)
    await res.send(contact)
  } catch (error) {
    
  } 
})
app.get('/nha',(req,res)=>{
  res.send('router nha')
})
