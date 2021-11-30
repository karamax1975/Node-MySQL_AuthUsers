const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { user, token } = require('../models/index_model.js');
const mailService = require('./mail-service.js');
const { generateTokens } = require('./token-service.js');


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

  async logIn(userEmail, userPassword) {
    const findUser = await user.findOne({ where: { email: userEmail } });
    if (!findUser) throw new Error('No user in BD');
    else {
      const { id, isActivated, email, password } = findUser.dataValues;
      const isPasswordEquals = await bcrypt.compare(userPassword, password);
      if (!isPasswordEquals) throw new Error('Bad password');
      else {
        const newToken = await generateTokens({ id, email });
        const { refreshToken } = newToken;
        const userToken = await token.findOne({ where: { userId: id } });
        !userToken ? await token.create({ userId: id, referenceToken: refreshToken }) : userToken.update({ referenceToken: refreshToken })
        return { userToken: newToken, id, email, isActivated };
      }
    }

  }


  async userActivate(activationLink) {
    const findLink = await user.findOne({ where: { activationLink } });
    if (!findLink) {
      throw new Error('Bad link');
    } else {
      await findLink.update({ isActivated: true })
      return true
    }
  }




  async logOut(referenceToken) {
    if (!referenceToken) {
      throw new Error('No token on cookie');
    } else {
      const removeToken = await token.findOne({ where: { referenceToken } });
      if (!removeToken) {
        throw new Error('No token on BD');
      } else {
        const destroy = await token.destroy({ where: { id: removeToken.dataValues.id } })
        console.log(destroy);
        return { referenceToken: referenceToken }
      }
    }

  }


}

module.exports = new UserService();