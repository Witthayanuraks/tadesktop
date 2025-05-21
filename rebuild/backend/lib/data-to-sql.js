function buildInsertQuery(data, { table }) {
  const keys = []
  const values = []

  for (const key in data) {
    if (data[key] !== undefined) {
      keys.push(key)
      values.push(typeof data[key] === 'object' && data[key] !== null
        ? JSON.stringify(data[key])
        : data[key])
    }
  }

  const placeholders = keys.map(() => '?').join(', ')
  const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`

  return { query, value: values }
}

function buildUpdateQuery(data, { table, whereKey = 'id', whereValue }) {
  const getWhereValue = whereValue || data[whereKey]

  const setParts = []
  const values = []

  for (const key in data) {
    if (key === whereKey || data[key] === undefined) continue
    setParts.push(`${key} = ?`)
    values.push(typeof data[key] === 'object' && data[key] !== null
      ? JSON.stringify(data[key])
      : data[key])
  }

  const query = `UPDATE ${table} SET ${setParts.join(', ')} WHERE ${whereKey} = ?`

  return { query, value: [...values, getWhereValue] }
}

export {
  buildInsertQuery,
  buildUpdateQuery
}