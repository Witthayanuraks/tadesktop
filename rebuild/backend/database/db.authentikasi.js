// db.authentikasi.js
import { queryDB } from "../lib/database.js"
import validateContent from "../validation/global.js"
import { comparePassword, hashingPassword } from "../lib/pass-hash.js"
import { JsonWebTokenSign, JsonWebTokenVerify } from "../lib/jsonwebtoken.js"


const roleLabel = {
  penerimatamu: "Penerima Tamu",
  guru: "Guru",
  admin: "Admin"
}
const redirectRole = {
  penerimatamu: "/tamu",
  guru: "/guru",
  admin: "/admin"
}

async function autentikasi_login({ email, password } = {}) {
  // Validasi Parameter Login
  const validateParams = validateContent("schema_loginform", { email, password })
  if(!!validateParams) {
    return validateParams
  }
  // Cek apakah ada email pada database
  const searchUserDB = await queryDB(
    'SELECT * FROM pengguna WHERE email = ? LIMIT 1',
    [String(email)]
  )
  // Database error
  if(searchUserDB.error) {
    console.log("Database Error!", searchUserDB.error)
    return {
      error: "internalerror",
      message: "Internal Server Error"
    }
  }
  // Pengguna tidak ditemukan
  if(searchUserDB.noData) {
    return {
      error: "account_notfound",
      message: "Pengguna tidak ditemukan"
    }
  }
  const dataUser = searchUserDB.data[0]
  // Compare hasing password
  const isPasswordValid = comparePassword(password, dataUser.password)
  if(!isPasswordValid) {
    return {
      error: "password_unvalid",
      message: "Kata sandi salah!"
    }
  }
  return {
    data: {
      token: JsonWebTokenSign({
        user: {
          id: dataUser.id_pengguna,
          email: dataUser.email,
          name: dataUser.nama,
          role: dataUser.role
        }
      }).data,
      profile: {
        name: dataUser.nama,
        role: dataUser.role
      },
      redirect: redirectRole[dataUser.role]
    }
  }
}

// HANYA DIPAKAI PADA MIDDLEWARE ATAU MEMBUTUHKAN AUTENTIKASI USER
async function autentikasi_middleware_auth(auth = "") {
  // Middleware Token!
  const authToken = String(auth||"")
  if(!authToken) {
    return {
      error: "authentication_miss",
      message: "Authentikasi tidak ada, silahkan login ulang!"
    }
  }
  // Mengecek kembali token pada JWT
  const verifyToken = JsonWebTokenVerify(authToken)
  if(verifyToken.error) {
    return verifyToken
  }
  // Mengecek validasi adanya pada database
  const dbUsers = await queryDB(
    'SELECT * FROM pengguna WHERE id_pengguna = ? AND email = ?',
    [ String(verifyToken.data.user.id), String(verifyToken.data.user.email) ]
  )
  // Database error
  if(dbUsers.error) {
    console.log("Database Error!", dbUsers.error)
    return {
      error: "internalerror",
      message: "Internal Server Error"
    }
  }
  // Pengguna tidak ditemukan
  if(dbUsers.noData) {
    return {
      error: "account_notfound",
      message: "Pengguna tidak ditemukan"
    }
  }
  // Data kembali
  const userData = dbUsers.data[0]
  return {
    data: {
      id: userData.id_pengguna,
      email: userData.email,
      name: userData.nama,
      role: userData.role,
      rolelabel: roleLabel[userData.role]
    }
  }
}

async function autentikasi_ubahsandi(auth, { password_now, change_password, confirm_password } = {}) {
  // Permintaan Authentikasi
  const authNeed = await autentikasi_middleware_auth(auth)
  if(authNeed.error) {
    return authNeed
  }
  // Validasi Parameter Login
  const validateParams = validateContent("schema_changepasswordform", {
    password_now, change_password, confirm_password
  })
  if(!!validateParams) {
    return validateParams
  }
  // Cek Konfirmasi
  if(String(change_password).trim() !== String(confirm_password).trim()) {
    return {
      error: "password_change_not_match_confrim",
      message: "Perubahan kata sandi ditolak karena konfirmasi tidak benar"
    }
  }
  // Pemintaan kata sandi melewati database lagi -- Pengecekan Ulang
  const dbUsers = await queryDB(
    'SELECT * FROM pengguna WHERE id_pengguna = ? AND email = ?',
    [String(authNeed.data.id), String(authNeed.data.email)]
  )
  // Database error -- Pengecekan Ulang
  if(dbUsers.error) {
    console.log("Database Error!", dbUsers.error)
    return {
      error: "internalerror",
      message: "Internal Server Error"
    }
  }
  // Pengguna tidak ditemukan -- Pengecekan Ulang
  if(dbUsers.noData) {
    return {
      error: "account_notfound",
      message: "Pengguna tidak ditemukan"
    }
  }
  // Hasing validasi kata sandi sekarang -- Pengecekan Ulang
  const isPasswordValid = comparePassword(password_now, dbUsers.data[0].password)
  if(!isPasswordValid) {
    return {
      error: "password_now_unvalid",
      message: "Kata sandi saat ini salah!"
    }
  }
  const isPasswordSame = comparePassword(change_password, dbUsers.data[0].password)
  if(isPasswordSame) {
    return {
      error: "password_change_notsame",
      message: "Kata sandi yang diubah tidak boleh sama dengan sebelumnya!"
    }
  }
  // Perubahan kata sandi
  const hasingPassword = hashingPassword(change_password)
  const changePw = await queryDB(
    'UPDATE `pengguna` SET `password` = ? WHERE id_pengguna = ?',
    [String(hasingPassword), String(authNeed.data.id)]
  )
  if(changePw.error) {
    console.log("Database Error!", changePw.error)
    return {
      error: "internalerror",
      message: "Internal Server Error"
    }
  }
  // Perubahan berhasil
  return {
    data: {
      success: true
    }
  }
}

export {
  autentikasi_middleware_auth, // ✅ Middleware Authentication
  autentikasi_login,           // ✅ Login Account 
  autentikasi_ubahsandi,       // ✅ Ubah Kata Sandi
}