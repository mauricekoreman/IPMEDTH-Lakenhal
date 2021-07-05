const server = require("http").createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  // join a conversation
  const { roomId } = socket.handshake.query;
  const { roomIds } = socket.handshake.query;

  console.log([roomIds]);

  socket.join(roomId);
  socket.join([roomId]);
  // listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    io.in(roomIds).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
    socket.leave(roomIds);
  });
});

server.listen(PORT, () => {
  console.log(`Linstening on port ${PORT}`);
});
