import { autentikasi_middleware_auth } from "../database/db.authentikasi.js"

function middlewareRoleUsed(roleApply = ["*"]) {
  return async (req, res, next) => {
    const usesTokenApply = String(req.tokenAuth||"")
    // Tidak memiliki authentikasi
    if(!usesTokenApply) {
      return res.status(401).json({
        error: "unauthorization_location",
        message: "Akses diblokir, tidak memiliki authentikasi diarea ini, silahkan login",
        action: {
          redirect: "/login"
        }
      })
    }
    // Pengecekan melewati middleware
    const tokendata = await autentikasi_middleware_auth(usesTokenApply)
    if(tokendata.error) {
      return res.status(500).json({
        error: tokendata.error,
        message: tokendata.message,
        action: {
          redirect: "/login"
        }
      })
    }
    // Apakah ada role semuanya?
    if(roleApply.includes("*")) {
      req.dataUser = tokendata.data
      next()
      return;
    }
    // Pendeteksi lain
    if(!roleApply.includes(String(tokendata.data?.role))) {
      return res.status(403).json({
        error: "forbidden_request",
        message: "Akses diblokir, kamu tidak memiliki akses ke sini!"
      })
    }
    // Lanjutkan
    req.dataUser = tokendata.data
    next()
  }
}

export default middlewareRoleUsed