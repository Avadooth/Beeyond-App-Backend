  import { Server } from "socket.io";
  import Order from "../models/Order.js";

  let io;

  export const initSocket = (server) => {
    io = new Server(server, {
      cors: {
        origin: "http://localhost:5173", // ✅ Frontend URL
        methods: ["GET", "POST", "PATCH"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("✅ Partner connected:", socket.id);

      socket.on("joinOrderRoom", ({ orderId }) => {
        console.log("Joining room:", orderId);
        socket.join(orderId);
      });
      socket.on("newOrderPlaced", (order) => {
        console.log("📦 New order placed:", order._id);
        io.to(`partner_${partnerId}`).emit("newOrder", order); // broadcast to all connected delivery sockets
      });

      socket.on("updateOrderStatus", async ({ orderId, status }) => {
        await Order.findByIdAndUpdate(orderId, { status });
        io.to(orderId).emit("orderStatusUpdate", { orderId, status });
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    return io;
  };

  export const getIO = () => {
    if (!io) {
      throw new Error("Socket.io not initialized yet");
    }
    return io;
  };
