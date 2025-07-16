import http from "http";
import app from "./app.js";
import { initSocket } from "./sockets/socketHandler.js"; // ✅ updated import

const server = http.createServer(app);

const io = initSocket(server);
app.set("io", io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
