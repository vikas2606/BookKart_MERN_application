const express=require("express")
const dotenv=require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routes/UserRoutes")
const bookRoutes=require("./routes/BookRoutes")
const cartRoutes=require("./routes/CartRoutes")
const path = require('path')

const { notFound, errorHandler } = require("./middleware/errorMiddleware")

const app=express()
dotenv.config()
connectDB()
app.use(express.json())

app.use("/api/users",userRoutes)
app.use("/api/books",bookRoutes)
app.use("/api/cart",cartRoutes)

//-----------------------deploymenyt-------------------

const __dirname1=path.resolve()
if(process.env.NODE_ENV==='production'){
app.use(express.static(path.join(__dirname1,"/frontend/build")))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
})
}else{
    app.get("/",(req,res)=>{
        res.send("API is Running Successfully")
    })
}

//-----------------------deploymenyt-------------------


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log("Server started on PORT 5000"))