const jwt = require('jsonwebtoken');

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return { accessToken, refreshToken }
  }

  async decodeToken(refreshToken) {

  }

}

module.exports = new TokenService();