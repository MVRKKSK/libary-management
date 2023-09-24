const express = require("express")
const router = express.Router()
const { addToCart, getBooks, getCartItems } = require("../controllers/books")

router.post("/addToCart", addToCart)
router.get("/getBooks", getBooks);
router.post("/getCartItems", getCartItems);

module.exports = router