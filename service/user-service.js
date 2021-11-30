const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { user, token } = require('../models/index_model.js');
const mailService = require('./mail-service.js');
const { generateTokens, decodeToken } = require('./token-service.js');


class UserService {

  async registration(email, password) {
    const candidate = await user.findOne({ where: { email: email } })
    if (candidate) {
      throw new Error(`User with this email ${email} exists`)
    } else {
      const hashPassword = await bcrypt.hash(password, 3);
      const activationLink = await uuid.v4();
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);


      const newUser = await user.create(
        {
          email,
          password: hashPassword,
          activationLink
        });

      const { id } = newUser.dataValues;
      const userToken = await generateTokens({ id, email });
      token.create({ userId: id, referenceToken: userToken.refreshToken });
      return {
        message: 'User create',
        user: email,
        accessToken: userToken.accessToken,
        referenceToken: userToken.refreshToken
      }
    }
  }

  async userActivate(activationLink) {
    const findLink = await user.findOne({ where: { activationLink } });
    if (!findLink) {
      throw new Error('Bed link');
    } else {
      await findLink.update({ isActivated: true })
      return true
    }
  }
  async userCheck(email, password) {
    const verifiableUser = await user.findOne({ where: { email } });
    if (!verifiableUser) {
      throw new Error('No user on BD')
    } else {
      const isPasswordEquals = await bcrypt.compare(password, verifiableUser.dataValues.password);
      if (!isPasswordEquals) {
        throw new Error('Bed password');
      } else {
        const newToken = await generateTokens({ id: verifiableUser.dataValues.id, email: verifiableUser.dataValues.id });
        const userToken = await token.findOne({ where: { userId: verifiableUser.dataValues.id } });
        const updateToken = await userToken.update({ referenceToken: newToken.refreshToken });
        if (!updateToken) {
          throw new Error('Error to save on BD token');
        } else {
          const { id, isActivated, email } = verifiableUser.dataValues;
          return { newToken, id, isActivated, email };
        }
      }
    }
  }
}

module.exports = new UserService();