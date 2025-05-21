import { buildInsertQuery } from "../lib/data-to-sql.js"
import { queryDB } from "../lib/database.js"
import validateContent from "../validation/global.js"
import * as uuid from "uuid"

const statusJanji = {
  menunggu: "Menunggu",
  telat: "Terlambat",
  selesai: "Selesai"
}

async function janjitemu_daftarjanji({ showNext } = {}) {
  const showNextPage = (isNaN(showNext)? 0:parseInt(showNext))*50
  // List daftar janjian
  const getListJanji = await queryDB(`SELECT jt.*,
  t.nama AS tamu_nama,
  t.telepon AS tamu_telepon,
  p.nama AS pengguna_nama,
  p.role AS pengguna_role
FROM janji_temu jt
JOIN tamu t ON jt.id_tamu = t.id_tamu
JOIN pengguna p ON jt.id_guru = p.id_pengguna
LIMIT 50 OFFSET ?`, [showNextPage])
  if(getListJanji.error) {
    return {
      error: "internalerror",
      message: "Internal Server Error"
    }
  }
  // Return listnya
  return {
    data: getListJanji.data.map(data => ({
      id: data.id_janji_temu,
      pengguna: {
        id: data.id_pengguna,
        nama: data.pengguna_nama,
        role: data.pengguna_role
      },
      tamu: {
        id: data.id_tamu,
        nama: data.tamu_nama,
        telepon: data.tamu_telepon
      },
      tanggal: data.tanggal,
      waktu: data.waktu,
      keperluan: data.keperluan,
      status: statusJanji[data.status],
      kode_qr: data.kode_qr
    }))
  }
}
async function janjitemu_janjiperguru({ id, showNext } = {}) {
  // Validasi ID
  if(!id || isNaN(id) || isNaN(String(parseInt(id)))) {
    return {
      error: "unvalid_idformat",
      message: "ID salah, tidak dapat diterima"
    }
  }
  const showNextPage = (isNaN(showNext)? 0:parseInt(showNext))*50
  // List daftar janjian
  const getListJanji = await queryDB(`SELECT jt.*,
  t.nama AS tamu_nama,
  t.telepon AS tamu_telepon,
  p.nama AS pengguna_nama,
  p.role AS pengguna_role
FROM janji_temu jt
JOIN tamu t ON jt.id_tamu = t.id_tamu
JOIN pengguna p ON jt.id_guru = p.id_pengguna
WHERE jt.id_guru = ?
LIMIT 50 OFFSET ?`, [parseInt(id), showNextPage])
  if(getListJanji.error) {
    return {
      error: "internalerror",
      message: "Internal Server Error"
    }
  }
  // Return listnya
  return {
    data: getListJanji.data.map(data => ({
      id: data.id_janji_temu,
      pengguna: {
        id: data.id_pengguna,
        nama: data.pengguna_nama,
        role: data.pengguna_role
      },
      tamu: {
        id: data.id_tamu,
        nama: data.tamu_nama,
        telepon: data.tamu_telepon
      },
      tanggal: data.tanggal,
      waktu: data.waktu,
      keperluan: data.keperluan,
      status: statusJanji[data.status],
      kode_qr: data.kode_qr
    }))
  }
}

async function janjitemu_buatperjanjian({ id_tamu, id_guru, tanggal, waktu, keperluan = "" } = {}) {
  // Check validation
  const validateForm = validateContent("schema_addjanjitemu", { id_tamu, id_guru, tanggal, waktu, keperluan })
  if(!!validateForm) {
    return validateForm
  }
  // Pengecekan ID Guru tersedia atau tidak
  const getGuruID = await queryDB('SELECT id_pengguna, nama FROM pengguna WHERE id_pengguna = ? AND role = \'guru\'', [parseInt(id_guru)])
  if(getGuruID.error) {
    return {
      error: "internalerror",
      message: "Internal Server Error"
    }
  }
  // Data Guru
  const dataGuru = getGuruID.data[0]
  if(!dataGuru) {
    return {
      error: "select_notfound",
      message: "ID Guru tersebut tidak ditemukan"
    }
  }
  // Pengecekan ID Tamu tersedia atau tidak
  const getTamuID = await queryDB('SELECT nama FROM tamu WHERE id_tamu = ?', [parseInt(id_tamu)])
  if(getTamuID.error) {
    return {
      error: "internalerror",
      message: "Internal Server Error"
    }
  }
  // Data Tamu
  const dataTamu = getTamuID.data[0]
  if(!dataTamu) {
    return {
      error: "select_notfound",
      message: "ID Tamu tersebut tidak ditemukan"
    }
  }
  // Pengolahan data
  const dataInput = {
    id_tamu: parseInt(id_tamu),
    id_guru: parseInt(id_guru),
    tanggal: tanggal,
    waktu: waktu,
    keperluan: String(keperluan).trim(),
    status: "menunggu",
    kode_qr: uuid.v4()
  }
  // Build Data Input Ke Data Query
  const buildData = buildInsertQuery(dataInput, { table: "janji_temu" })
  console.log(buildData)
  const applyInsert = await queryDB(buildData.query, buildData.value)
  if(applyInsert.error) {
    return {
      error: "internalerror",
      message: "Internal Server Error"
    }
  }
  // Kembalikan dengan data success (Dengan Memberikan Kode QR)
  return {
    data: {
      success: true,
      qr_code: dataInput.kode_qr
    }
  }
}

async function janjitemu_statusjanjian({ id, status } = {}) {
  // Check validation
  const validateForm = validateContent("schema_changestatusjanjitemu", { id, status })
  if(!!validateForm) {
    return validateForm
  }
  // Cek data ada atau tidak
  const dataTemu = await queryDB('SELECT * FROM janji_temu WHERE id_janji_temu = ?', [parseInt(id)])
  if(dataTemu.error) {
    return {
      error: "internalerror",
      message: "Internal Server Error"
    }
  }
  if(!dataTemu.data[0]) {
    return {
      error: "notfound",
      message: "Tidak ditemukan"
    }
  }
  // Memperbarui datanya
  const dataUpdate = await queryDB('UPDATE janji_temu SET status = ? WHERE id_janji_temu = ?',[String(status).toLowerCase(), parseInt(id)])
  if(dataUpdate.error) {
    return {
      error: "internalerror",
      message: "Internal Server Error"
    }
  }
  // Berhasil
  return {
    data: {
      success: true
    }
  }
}

async function janjitemu_qrcode({ kode } = {}) {
  // List daftar janjian
  const getListJanji = await queryDB(`SELECT jt.*,
  t.nama AS tamu_nama,
  t.telepon AS tamu_telepon,
  p.nama AS pengguna_nama,
  p.role AS pengguna_role
FROM janji_temu jt
JOIN tamu t ON jt.id_tamu = t.id_tamu
JOIN pengguna p ON jt.id_guru = p.id_pengguna
WHERE kode_qr = ?
LIMIT 1`, [String(kode)])
  if(getListJanji.error) {
    return {
      error: "internalerror",
      message: "Internal Server Error"
    }
  }
  if(getListJanji.noData) {
    return {
      error: "notfound",
      message: "Tidak ditemukan"
    }
  }
  const dataUser = getListJanji.data[0]
  return {
    data: {
      id: dataUser.id_janji_temu,
      pengguna: {
        id: dataUser.id_pengguna,
        nama: dataUser.pengguna_nama,
        role: dataUser.pengguna_role
      },
      tamu: {
        id: dataUser.id_tamu,
        nama: dataUser.tamu_nama,
        telepon: dataUser.tamu_telepon
      },
      tanggal: dataUser.tanggal,
      waktu: dataUser.waktu,
      keperluan: dataUser.keperluan,
      status: statusJanji[dataUser.status],
      kode_qr: dataUser.kode_qr
    }
  }
}

async function janjitemu_hariini({ showNext } = {}) {
  const showNextPage = (isNaN(showNext)? 0:parseInt(showNext))*50
  // List daftar janjian
  const getListJanji = await queryDB(`SELECT jt.*,
  t.nama AS tamu_nama,
  t.telepon AS tamu_telepon,
  p.nama AS pengguna_nama,
  p.role AS pengguna_role
FROM janji_temu jt
JOIN tamu t ON jt.id_tamu = t.id_tamu
JOIN pengguna p ON jt.id_guru = p.id_pengguna
WHERE tanggal = CURRENT_DATE
LIMIT 50 OFFSET ?`, [showNextPage])
  if(getListJanji.error) {
    return {
      error: "internalerror",
      message: "Internal Server Error"
    }
  }
  // Return listnya
  return {
    data: getListJanji.data.map(data => ({
      id: data.id_janji_temu,
      pengguna: {
        id: data.id_pengguna,
        nama: data.pengguna_nama,
        role: data.pengguna_role
      },
      tamu: {
        id: data.id_tamu,
        nama: data.tamu_nama,
        telepon: data.tamu_telepon
      },
      tanggal: data.tanggal,
      waktu: data.waktu,
      keperluan: data.keperluan,
      status: statusJanji[data.status],
      kode_qr: data.kode_qr
    }))
  }
}

export {
  janjitemu_daftarjanji,
  janjitemu_janjiperguru,
  janjitemu_buatperjanjian,
  janjitemu_statusjanjian,
  janjitemu_qrcode,
  janjitemu_hariini,
}