import http from "http"
import app from "./app.js"
import { Server } from "socket.io";
import socketHandler from "./sockets/socketHandler.js"

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
