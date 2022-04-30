const router = require('express').Router();
const {
  getAlThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought
} = require('../../controllers/thought-controller');
//CREATE A THOUGHT 
router.route("/").get(getAllThoughts).post(createThought);

//THOUGHTS BY ID
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

//USING THOUGHT ID TO ADD AND REMOVE REACTIONS
router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;