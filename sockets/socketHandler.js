import Order from '../models/Order.js';


const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('joinOrderRoom', ({ orderId }) => {
            socket.join(orderId);
        });

        socket.on('updateOrderStatus', async ({ orderId, status }) => {
            await Order.findByIdAndUpdate(orderId, { status });
            io.to(orderId).emit('orderStatusUpdate', { orderId, status });
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};
export default socketHandler;
