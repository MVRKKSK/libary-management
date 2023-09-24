const express = require("express")
const router = express.Router()
const { createUser, activateAccount } = require("../controllers/signup.js")
const { sendEmail, sendWork } = require("../helpers/mailer.js")



router.post("/signup", createUser)

router.post("/email", sendEmail)
router.post("/workmail", sendWork)


module.exports = router