const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    items: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "books"
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price: {
                type: Number,
                default:0
                //required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    }
});

cartSchema.pre("save", function (next) {
    this.totalPrice = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    next();
});

const Cart = mongoose.model("Carts", cartSchema);

module.exports = Cart;
