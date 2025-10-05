const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const initSocket = require("./socket");

dotenv.config();
connectDB();

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const roomRoutes = require("./routes/room.routes");
const tournamentRoutes = require("./routes/tournament.routes");
const matchRoutes = require("./routes/match.routes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });
initSocket(io);

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/matches", matchRoutes);

// health
app.get("/", (req, res) => res.send({ ok: true, time: new Date() }));

const PORT = process.env.PORT || 8080;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT} — Socket.IO ready`)
);
