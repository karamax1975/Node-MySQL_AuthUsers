const jwt = require('jsonwebtoken');
const { token } = require('../models/index_model');

class TokenService {

  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return { accessToken, refreshToken }
  }

  async saveNewToken(userId, referenceToken) {
    const createdTokenInBD = await token.create({ userId, referenceToken });
    if (!createdTokenInBD) {
      throw new Error('Error while creating token')
    } else {
      return true
    }
  }
}

module.exports = new TokenService();