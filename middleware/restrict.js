const restrict = (req, res, next) => {
  console.log('restrict called')
  console.log(req.headers)
  let token;
  
  next();
}

module.exports = restrict;