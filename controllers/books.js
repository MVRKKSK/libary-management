const User = require("../models/user.js");
const book = require("../models/books.js");
exports.addToCart = async(req, res) => {
    try {
        const { bookid, userid, quantity } = req.body.body;
        const user = await User.findById(userid);
        if (user) {
            const bookToAdd = bookid;
            const quantityToAdd = quantity;
            const existingCartItem = user.cart.find(item => JSON.stringify(item.bookId) === JSON.stringify(bookToAdd));
            if (existingCartItem) {
                existingCartItem.quantity += quantityToAdd;
            } else {
                user.cart.push({ bookId: bookToAdd, quantity: quantityToAdd });
            }
            await user.save();
            return res
                .status(200)
                .json({ message: "Book added to cart successfully", user });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// exports.addBooks = async(req, res) => {
//     try {
//         const { title, author, imageUrl, total, price } = req.body;
//         const Book = new book({ title: title, author: author, imageUrl: imageUrl, total: total, price: price });
//         const data = await Book.save()
//         res.status(200).json({ data })
//     } catch (err) {
//         return res.status(500).json({ message: "internal Server error" });
//         1
//     }
// }

exports.getBooks = async(req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; // Default to 10 if limit is not provided
        const offset = parseInt(req.query.offset) || 0; // Default to 0 if offset is not provided

        const data = await book.find().skip(offset).limit(limit);

        if (!data || data.length === 0) {
            return res.status(404).json("There is no data");
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getCartItems = async(req, res) => {
    try {
        const { userId } = req.body;
        console.log(req.body)
        let arr = [];
        const data = await User.findById(userId);
        console.log(data);
        if (!data) {
            res.status(404).json("user not found");
        }
        data.cart.map((item) => {
            const sample = item;
            arr.push(sample);
        })
        const bookData = [];
        await Promise.all(arr.map(async(item) => {
            const bookItem = await book.findById(item.bookId);
            if (bookItem) {
                const { imageUrl, title, author, category, price } = bookItem;
                bookData.push({ imageUrl, title, author, category, quantity: item.quantity, price });
            }
        }));
        console.log(bookData)
        res.status(200).json(bookData);
    } catch (err) {
        console.log(err);
    }

};