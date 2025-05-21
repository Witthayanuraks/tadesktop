const headingFirstPrefix = "Auth" // Ubah perfixnya jika diinginkan

// Digunakan untuk mengizinkan atau menaruh tokenAuth pada request ketika ada authorization
function middlewareApplyAuth(req, res, next) {
  console.log(`[Request ${String(req.method).toUpperCase()}]: ${req.url}`)
  const tokenAuth = req.headers['authorization']
  req.tokenAuth = !!tokenAuth && String(
    !!(tokenAuth.split(' ')[0] === headingFirstPrefix)?
    String(tokenAuth.split(' ').slice(1).join(' ')):""
  )
  next()
}

export default middlewareApplyAuth