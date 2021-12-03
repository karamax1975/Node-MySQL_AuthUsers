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
      return createdTokenInBD
    }
  }

  async validateRefreshToken(candidate) {
    try {
      return jwt.verify(candidate, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return null
    }
  }

  async validateAccessToken(candidate) {
    try {
      return jwt.verify(candidate, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
      return null
    }
  }

  async updateRefreshToken(tokenObj, refreshToken) {
    const update = await tokenObj.update({ referenceToken: refreshToken });
    if (!update) {
      throw new Error('Error update refreshToken');
    } else return update;
  }

  async findUserRefreshToken(userId) {
    const find = await token.findOne({ where: { userId } });
    if (!find) {
      return { status: false, message: 'No token at BD' }
    } else return { status: true, token: find, message: 'All right' }
  }
}

module.exports = new TokenService();