const express=require('express')
const mongoose=require('mongoose');
const app= express()
const route=require("./Routers/routes")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://rkpandeyisin2015:B54DrIXCMjAsvffT@cluster1.3i5fv9s.mongodb.net/Open_to_intern',{useNewUrlParser:true})
  .then(()=>{console.log('MongoDb is connected...')})
  .catch((err)=>{console.log(err.message);})


  app.use('/',route)

  app.listen(process.env.PORT||3000 ,()=>{
    console.log('Express app running on Port: ', (process.env.PORT || 3000));
  })
