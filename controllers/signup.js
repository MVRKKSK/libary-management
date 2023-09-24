const user = require("../models/user.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Emailvalidator = require("email-validator");
const { sendVerificationEmail } = require("../helpers/mailer")
exports.createUser = async(req, res) => {
        try {
            const { college, email, name, password } = req.body
            const checkUser = await user.findOne({ "email": email })
            if (checkUser) {
                res.status(404).json("email already available")
            }
            const validateEmail = Emailvalidator.validate(email)
            if (!validateEmail) return res.status(401).json("Invalid Email");
            const User = new user({
                college: college.toLowerCase(),
                password: password,
                email: email,
                name
            })
            const saltrounds = 10
            User.password = await bcrypt.hash(password, saltrounds)
            User.save()
            const payload = { userId: User._id }
            const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30m" })
            const url = `${process.env.BASE_URL}/activateuser/${token}`
                // sendVerificationEmail(User.email, User.name, url);
            const NewToken = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" })
            res.json({
                id: User._id,
                username: User.username,
                name: User.name,
                token: NewToken,
                verified: User.verified,
                message: "Register Success ! please activate your email to start",
                email: User.email
            })
        } catch (err) {
            console.log(err)
        }
    }
    /* exports.activateAccount = async(req, res) => {
        const { token } = req.body
        const User = jwt.verify(token, process.env.JWT_SECRET)
        const Check_Verified = await user.findById(User.userId)
        if (Check_Verified.verified == true) {
            res.status(400).json({ message: "User is already activated" })
        } else {
            await user.findByIdAndUpdate(User.userId, { verified: true })
            res.status(200).json({ message: "Your Email has been activated" })


        }
    } */