const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  removeThought,
  addReaction,
} = require('../../controllers/thought-controller');
//CREATE A THOUGHT 
router.route("/")
.get(getAllThoughts)
.post(createThought);

//THOUGHTS BY ID
router
  .route('/:id')
  .post(createThought)
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

//USING THOUGHT ID TO ADD AND REMOVE REACTIONS
router.route("/:thoughtId/reactions").post(addReaction);
// router.route("/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;