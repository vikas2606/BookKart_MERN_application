const express=require('express')
const {getBooks, createBook,getBookbyId,updateBook,deleteBook}=require("../controllers/bookController")
const {protect} = require("../middleware/authMiddleware")

const router=express.Router()
router.route("/").get(protect,getBooks)
router.route("/create").post(protect,createBook)
router.route("/:id").get(protect,getBookbyId).put(protect,updateBook).delete(protect,deleteBook)
//router.route("/create").post()
//router.route("/:id").get().put().delete()

module.exports=router