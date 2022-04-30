const { Thought } = require('../models');

const thoughtController = {
  //GET ALL THOUGHTS
  getAllThought(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  //GET ONE THOUGHT BY ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  //CREATE THOUGHT
  createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },

  // UPDATE THOUGHT
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  //REMOVE THOUGHT
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },
  //ADD REACTION
  addReaction({ params, body }, res) {
    console.log(body);
    Reaction.create(body)
      .then(({ _id }) => {
        return Reaction.findOneAndUpdate(
          { _id: params.ReactionId },
          { $push: { Reaction: _id } },
          { new: true }
        );
      })
      .then(dbReactionData => {
        if (!dbReactionData) {
          res.status(404).json({ message: 'No Reaction found with this id!' });
          return;
        }
        res.json(dbReactionData);
      })
      .catch(err => res.json(err));
  },
};

module.exports = thoughtController;
