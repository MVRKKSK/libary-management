const nodemailer = require("nodemailer");
exports.sendEmail = async(req, res) => {
    const { email, link, name } = req.body
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASS
        }
    })
    try {
        await transport.sendMail({
            from: process.env.EMAIL_ID,
            to: email,
            subject: "Event Registration",
            html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://work-venture-frontend.vercel.app/static/media/logo.aa03239156eeb4db97a7.png" alt="" style="width:30px"><span>You have Registered for the event</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">Please find the Meeting Link for the Event </span> ${link}</div></a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Thank you for registering for the event ..</span></div></div>`,
        })
        res.status(200).json({ message: "mail success" })
    } catch (err) {
        res.json({ "error": err })
    }
};

exports.sendWork = async(req, res) => {
    const { email, userEmail, name } = req.body
    console.log(email, userEmail, name)
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASS
        }
    })
    try {
        await transport.sendMail({
            from: process.env.EMAIL_ID,
            to: email,
            subject: "Project Member Applied",
            html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://work-venture-frontend.vercel.app/static/media/logo.aa03239156eeb4db97a7.png" alt="" style="width:30px"><span>${name} has interest in working in your project</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>
            contact him by his mail : ${userEmail}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">happy coding  </span> </div></a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">please delete the post after your member has decided</span></div></div>`,
        })
        res.status(200).json({ message: "mail success" })
    } catch (err) {
        res.json({ "error": err })
    }
};