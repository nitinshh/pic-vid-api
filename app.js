const express = require('express')
const multer = require('multer')
const path = require('path')
const PORT = 3000
const app = express()

const userRouter=require('./routers/userRouter')
app.use("/user",userRouter)

app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})