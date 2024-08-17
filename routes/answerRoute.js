const express = require("express");
const router = express.Router();
const {
  getAllanswers,
  giveAnswers,
} = require("../controller/answerController");
// authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:id", getAllanswers);
router.post("/give-answers", giveAnswers);

module.exports = router;