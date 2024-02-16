import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();

    await user.save();
    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({username});

    if (!user) {
      return res.status(422).send({error: 'Username not found!'});
    }

    const isMath = await user.checkPassword(password);

    if (!isMath) {
      return res.status(422).send({error: 'Password is wrong!'});
    }

    user.generateToken();
    await user.save();

    return res.send({message: 'Username and password are correct!', user});
  } catch (e) {
    next(e);
  }
})
export default usersRouter;