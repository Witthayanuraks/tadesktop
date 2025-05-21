import mysql from "mysql2/promise"
import "../lib/env.js"

const poolDB = mysql.createPool({
  // -- Configuration
  host: process.env.DB_HOST || "localhost", 
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME ||"buku_tamu",
  port: process.env.DB_PORT || undefined,
  // -- Other
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0
})

async function queryDB(query, values) {
  try {
    const dataSql = await poolDB.query(query, values)
    const dataRes = !!dataSql? dataSql[0] : undefined
    return {
      error: null,
      noData: !!dataRes? !dataRes[0] : true,
      data: dataRes,
      field: dataSql[1] || []
    }
  } catch(e) {
    console.log("Database Error:", e.stack)
    return {
      error: e.stack,
      noData: true,
      data: [],
      field: []
    }
  }
}

async function multiDB(queryParams = []) {
  const buildQueryArray = (queryParams || []).map((data) => ({
    query: Array.isArray(data)? data[0] : data,
    values: Array.isArray(data)? data[1] : undefined
  }))
  const resultsRequest = await Promise.all(
    buildQueryArray.map((dataBuild) => queryDB(dataBuild.query, dataBuild.values))
  )
  return resultsRequest
}

export default poolDB
export {
  queryDB,
  multiDB
}