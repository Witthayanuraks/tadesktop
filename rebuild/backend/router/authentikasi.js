// authentikasi.js 
import { Router } from "express"
import { autentikasi_login, autentikasi_ubahsandi } from "../database/db.authentikasi.js"
import trimString from "../lib/trimming-string.js"

const router = Router()

// # Login User
router.post("/login", async (req, res) => {
  const bodyString = trimString(req.body)
  const dataRequest = await autentikasi_login(bodyString)
  return res
    .status(dataRequest.data? 200:(dataRequest?.errorcode || dataRequest?.error === "internalerror"?500:400))
    .json(dataRequest)
})
// # Logout User
router.post("/logout", async (req, res) => {
  // Idk, No Require Logout On Notes
})
// # Change Password
router.put("/change-password", async (req, res) => {
  const bodyString = trimString(req.body)
  const dataRequest = await autentikasi_ubahsandi(bodyString)
  return res
    .status(dataRequest.data? 200:(dataRequest?.errorcode || dataRequest?.error === "internalerror"?500:400))
    .json(dataRequest)
})

export default router