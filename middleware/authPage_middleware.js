const { validateRefreshToken } = require('../service/token-service')

module.exports = async function (req, res, next) {
  try {
    const referenceToken = req.cookies.referenceToken
    if (!referenceToken) {
      throw new Error('Access denied')
    } else {
      const verifeAccess = await validateRefreshToken(referenceToken);
      if (!verifeAccess) {
        throw new Error('Access denied')
      } else {
        next();
      }
    }


  } catch (e) {
    console.log(e.message);
    res.redirect('/')
  }

}