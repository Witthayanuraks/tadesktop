const headingFirstPrefix = "Auth" // Ubah prefixnya kalau mau

function middlewareApplyAuth(req, res, next) {
  next()

  if (tokenAuth && typeof tokenAuth === 'string') {
    const [prefix, ...tokenParts] = tokenAuth.split(' ');
    req.tokenAuth = prefix === headingFirstPrefix ? tokenParts.join(' ') : "";
  } else {
    req.tokenAuth = "";
  }

  next();
}

export default middlewareApplyAuth;


// const headingFirstPrefix = "Auth" // Ubah perfixnya jika diinginkan

// // Digunakan untuk mengizinkan atau menaruh tokenAuth pada request ketika ada authorization
// function middlewareApplyAuth(req, res, next) {
//   const tokenAuth = req.headers['authorization']
//   req.tokenAuth = String(!!(tokenAuth.split(' ')[0] === headingFirstPrefix)? String(tokenAuth.split(' ').slice(1).join(' ')):"")
//   next()
// }

// export default middlewareApplyAuth