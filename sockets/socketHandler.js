  import { Server } from "socket.io";
  import Order from "../models/Order.js";

  let io;

  export const initSocket = (server) => {
    io = new Server(server, {
      cors: {
        origin: "http://51.20.157.181", 
        methods: ["GET", "POST", "PATCH"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {


      socket.on("joinOrderRoom", ({ orderId }) => {

        socket.join(orderId);
      });
      socket.on("newOrderPlaced", (order) => {

        io.to(`partner_${partnerId}`).emit("newOrder", order); 
      });

      socket.on("updateOrderStatus", async ({ orderId, status }) => {
        await Order.findByIdAndUpdate(orderId, { status });
        io.to(orderId).emit("orderStatusUpdate", { orderId, status });
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
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
