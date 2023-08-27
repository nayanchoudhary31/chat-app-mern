const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require("./routes/userRoutes");
app.use(express.json())
const PORT = process.env.PORT;

app.use('/api/user',userRoutes);

// app.get('/',(req,resp)=>{
//     resp.status(200).json({message:"Hello"})
// })

app.listen(PORT,()=>{
    console.log(`Running server on port ${PORT}`)
})