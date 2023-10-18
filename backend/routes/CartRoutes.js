const express=require('express')
const {protect}=require("../middleware/authMiddleware")
const {addToCart, removeFromCart,getCart, increaseQuantity, decreaseQuantity}=require("../controllers/CartController")

const router=express.Router()

router.route("/").post(protect,addToCart).get(protect,getCart)
router.route("/:bookId").delete(protect,removeFromCart)

router.route("/increase/").put(protect,increaseQuantity)
router.route("/decrease/").put(protect,decreaseQuantity)

module.exports=router