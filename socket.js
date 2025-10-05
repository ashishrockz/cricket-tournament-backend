// Central socket handling. Emits events per room id.
module.exports = function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-room", ({ roomId, user }) => {
      socket.join(roomId);
      io.to(roomId).emit("system-message", { text: `${user?.username || "Guest"} joined` });
    });

    socket.on("leave-room", ({ roomId, user }) => {
      socket.leave(roomId);
      io.to(roomId).emit("system-message", { text: `${user?.username || "Guest"} left` });
    });

    // Toss
    socket.on("toss", (data) => {
      // data: { roomId, winnerTeam, choice }
      io.to(data.roomId).emit("toss-update", data);
    });

    // Ball / score update
    socket.on("score-update", (data) => {
      // data: { roomId, event } where event contains ball details
      io.to(data.roomId).emit("score-update", data.event);
    });

    socket.on("wicket", (data) => io.to(data.roomId).emit("wicket-update", data));
    socket.on("over-complete", (data) => io.to(data.roomId).emit("over-complete", data));
    socket.on("match-end", (data) => io.to(data.roomId).emit("match-end", data));

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
