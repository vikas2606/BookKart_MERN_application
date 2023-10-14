const express=require("express")
const dotenv=require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routes/UserRoutes")
const bookRoutes=require("./routes/BookRoutes")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

const app=express()
dotenv.config()
connectDB()
app.use(express.json())

app.use("/api/users",userRoutes)
app.use("/api/books",bookRoutes)


app.use(notFound)
app.use(errorHandler)

app.listen(5000,console.log("Server started on PORT 5000"))