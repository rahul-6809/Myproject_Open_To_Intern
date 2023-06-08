const express=require('express')
const mongoose=require('mongoose');
const app= express()
const route=require("./Routers/routes")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost',{useNewUrlParser:true})
  .then(()=>{console.log('MongoDb is connected...')})
  .catch((err)=>{console.log(err.message);})


  app.use('/',route)

  app.listen(process.env.PORT||3000 ,()=>{
    console.log('Express app running on Port: ', (process.env.PORT || 3000));
  })
