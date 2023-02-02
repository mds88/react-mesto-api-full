const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');
const { messages } = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({}).populate(['owner', 'likes'])
    .then((cards) => res.send({ cards }))
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(`Ошибка валидации данных! ${error.message}`));
        return;
      }
      next(error);
    });
};

const deleteCard = (req, res, next) => {
  const ownerId = req.user._id;
  const { cardId } = req.params;

  Card.findOne({ _id: cardId })
    .orFail(new NotFoundError(`Карточка с id: ${cardId} не найдена!`))
    .then((card) => {
      if (JSON.stringify(card.owner) !== JSON.stringify(ownerId)) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      return card.delete();
    })
    .then(() => res.status(200).send({ message: messages.cardDeleted }))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Не правильный ID карточки'));
        return;
      }
      next(error);
    });
};

const commonActionDecorator = (action) => (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { [action]: { likes: userId } },
    { new: true },
  ).populate(['owner', 'likes'])
    .orFail(new NotFoundError(`Карточка с id: ${cardId} не найдена!`))
    .then((card) => res.send({ card }))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Не правильный ID карточки'));
        return;
      }
      next(error);
    });
};

const likeCard = commonActionDecorator('$addToSet');
const dislikeCard = commonActionDecorator('$pull');

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
