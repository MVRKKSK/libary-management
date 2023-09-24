const express = require("express")
const app = express()
const cors = require("cors")

// const server = require('http').createServer(app)
const fileUpload = require("express-fileupload");
const morgan = require("morgan")
const { readdirSync, read } = require("fs")
const bodyParser = require("body-parser")
const dotenv = require('dotenv')
dotenv.config()
const db = require("./db/db");
db();
app.use(cors({
    origin: "*",
}))
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(
    fileUpload({
        useTempFiles: true,
    })
);

/* const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
})

io.on('connection', socket => {
    console.log('connection made successfully')
    socket.on('message', payload => {
        console.log('Message received on server: ', payload)
        io.emit('message', payload)
    })
})

server.listen(7000, () => {
    console.log('I am listening at port: 7000');
})
 */
app.use(bodyParser.json());
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)))
app.get("/", (req, res) => {
    res.send("Unleash The Bankai")
})

app.listen(process.env.PORT || 8000, (req, res) => {
    console.log("server is connected")
})