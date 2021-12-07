const { validateAccessToken } = require('../service/token-service')


module.exports = async function (req, res, next) {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      throw new Error('Access denied');
    } else {
      const validation = await validateAccessToken(accessToken.split(' ')[1]);
      if (!validation) {
        throw new Error('Access denied');
      } else {
        req.user = validation;
        next();
      }

    }


  } catch (e) {
    console.log(e.message);
    res.redirect('/')
  }

}