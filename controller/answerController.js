const dbConnection = require("../db/dbconfig");
const { StatusCodes } = require("http-status-codes");

async function getAllanswers(req, res) {
  const questionId = req.params.id;
  console.log(questionId);
  try {
    // const answers = await dbConnection.query(
    //   "SELECT * FROM answers WHERE questionid = ?",
    //   [questionId]
    // );
    const answers = await dbConnection.query(
      `SELECT 
    a.*,
    (SELECT user_name FROM users WHERE user_id = a.user_id) AS user_name,
    (SELECT title FROM questions WHERE question_id =  a.question_id ) AS title,
    (SELECT description  FROM questions WHERE question_id =  a.question_id ) AS description
  FROM 
    answers a 
  WHERE 
    a.question_id = ?`,
      [questionId]
    );
    if (answers[0].length > 0) {
      return res.json(answers[0]);
    }
    const resp = await dbConnection.query(
      `SELECT title, description
FROM questions
WHERE question_id = ?`,
      [questionId]
    );
    return res.json(resp[0]);
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}
async function giveAnswers(req, res) {
  console.log(req.body);
  const { answer, id: questionid, userid } = req.body;
  console.log(answer, questionid, userid);
  if (!userid || !answer || !questionid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required information" });
  }
  const [questioner] = await dbConnection.query(
    "SELECT user_id FROM questions WHERE question_id = ? ",
    [questionid]
  );
  //   console.log(userid);
  if (questioner[0].user_id == userid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "you ask the question" });
  }
  const created = await dbConnection.query(
    "INSERT INTO answers (user_id, answer,  question_id) VALUES (?, ?, ?)",
    [userid, answer, questionid]
  );
  return res.status(StatusCodes.CREATED).json({ msg: "successfull" });
  //   return res.send(questioner[0]);
}
module.exports = { getAllanswers, giveAnswers };
