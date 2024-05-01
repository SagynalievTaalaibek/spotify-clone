import express from 'express';
import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User';
import config from '../config';
import { imagesUpload } from '../multer';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    });

    user.generateToken();

    await user.save();
    return res.send({ message: 'Ok', user });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).send({ error: 'User not found!' });
    }

    const isMath = await user.checkPassword(password);

    if (!isMath) {
      return res.status(422).send({ error: 'Password is wrong!' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Email and password are correct!', user });
  } catch (e) {
    next(e);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    console.log(payload);

    if (!payload) {
      return res.status(400).send({ error: 'Google login error!' });
    }

    const email = payload['email'];
    const avatar = payload['picture'];
    const id = payload['sub'];
    const displayName = payload['name'];
    const token = payload['sub'];

    if (!email || !displayName) {
      return res.status(400).send({ error: 'Email or Display name are not present!' });
    }

    let user = await User.findOne({ googleID: id });

    if (!user) {
      user = new User({
        email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName,
        avatar,
      });
    }

    user.token = token;
    await user.save();

    return res.send({
      message: 'Login with Google successful!',
      user,
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    const successMessage = { message: 'Success!!' };

    if (!headerValue) {
      return res.send(successMessage);
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.send(successMessage);
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send(successMessage);
    }

    user.generateToken();
    await user.save();

    return res.send(successMessage);
  } catch (e) {
    next(e);
  }
});
export default usersRouter;
