const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { MYSECRETKEY = 'kjlkjghdgfbhbjdjh45hfbgbhf' } = process.env;

function findUsers(res, next, id = undefined) {
  User.findById(id)
    .orFail(new NotFoundError(`Пользователь с id: ${id} не найден!`))
    .then((user) => res.send({ user }))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Не правильный ID пользователя'));
        return;
      }
      next(error);
    });
}

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

const getUserById = (req, res, next) => { findUsers(res, next, req.params.userId); };
const getMySelf = (req, res, next) => { findUsers(res, next, req.user._id); };

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }), { new: true, runValidators: true })
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.send(userObj);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(`Ошибка валидации данных! ${error.message}`));
        return;
      }
      if (error.code && error.code === 11000) {
        next(new ConflictError(`Пользователь с Email: ${email} уже существует!`));
        return;
      }
      next(error);
    });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError(`Пользователь с id: ${userId} не найден!`))
    .then((user) => res.send({ user }))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Не правильный ID пользователя'));
        return;
      }
      if (error.name === 'ValidationError') {
        next(new BadRequestError(`Ошибка валидации данных! ${error.message}`));
        return;
      }
      next(error);
    });
};

const updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError(`Пользователь с id: ${userId} не найден!`))
    .then((user) => res.send({ user }))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Не правильный ID пользователя'));
        return;
      }
      if (error.name === 'ValidationError') {
        next(new BadRequestError(`Ошибка валидации данных! ${error.message}`));
        return;
      }
      next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, MYSECRETKEY, { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true,
      }).send({ message: 'Аутентификация успешна' });
    })
    .catch(next);
};

const unLogin = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: -1,
  }).send({ message: 'Успешный выход' });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getMySelf,
  unLogin,
};
