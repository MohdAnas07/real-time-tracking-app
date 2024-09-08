const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const port = 8000
const server = http.createServer(app);

const io = socketio(server)

app.set("view engine", "ejs") // set tamplate engine 
app.use(express.static(path.join(__dirname, "public"))) // set static file folder 

// creat io connection 
io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data })
    })

    socket.on("disconnect", function (socket) {
        io.emit("user-disconnected", socket.id)
    })
    console.log("Socket io Connected");
})


app.get('/', (req, res) => {
    res.render("index")
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})