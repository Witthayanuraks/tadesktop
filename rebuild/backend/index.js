import cors from "cors"
import express from "express"
import { WebSocketRegister } from "./lib/websocket.js"
import authenticationRouter from "./router/authentikasi.js"
import janjiTamuRouter from "./router/janji-tamu.js"
import laporanRouter from "./router/laporan.js"
import penggunaRouter from "./router/pengguna.js"
import notifikasiRouter from "./router/notifikasi.js"
import pengelolaTamuRouter from "./router/pengelola-tamu.js"
import globalModel from "./model/global.js"
import databaseConfig from "./lib/database.js"
import middlewareApplyAuth from "./middleware/applyauth.js"
import "./lib/env.js"

// # Global
const port = process.env.PORT || process.env.DEV_PORT || 3001
const host = process.argv.includes("--dev")? "127.0.0.1":"0.0.0.0"
const app = express()


// // # CORS Configuration - simplified
// app.use(cors())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  origin: true
}))
// // # CORS Configuration
// const allowedOrigins = [
//   'http://localhost:3000',
//   'http://localhost:5173',
//   'http://127.0.0.1:5173' 
// ]

// // bungkusan cors
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Blocked by CORS: ' + origin))
//     }
//   },
//   credentials: true
// }))

// On Serverless / Microservices Limit In 40K(bytes)
app.use(express.json({ limit: '20kb' }))
app.use(middlewareApplyAuth)

// # Router API
app.use("/api/auth", authenticationRouter)       // Authentikasi
app.use("/api/users", penggunaRouter)            // Pengelolaan Pengguna
app.use("/api/tamu", pengelolaTamuRouter)        // Pengelolaan Tamu
app.use("/api/appointments", janjiTamuRouter)    // Janji Tamu
app.use("/api/notifications", notifikasiRouter)  // Notifikasi
app.use("/api/reports", laporanRouter)           // Laporan Tamu

// # Middleware If Error!
app.use((err, req, res, next) => {
  console.log(`[Error Log ${String(req.method).toUpperCase()}]: ${req.url}`, err)
  res.status(500).json({
    error: "internalerror",
    message: "Internal Server Error"
  })
})

// # Server Running
const server = app.listen(port, host, () => {
  console.log(`
  --- [ Running Development ] ---
  Web / API : http://${host}:${port}
  WebSocket : ws://${host}:${port}/ (use wss if https)
 `)
})
WebSocketRegister(server)

// # Global Init
globalModel(databaseConfig)