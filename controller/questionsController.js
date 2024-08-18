const dbConnection = require("../db/dbconfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

async function getAllQuestion(req, res) {
  try {
    const [questions] = await dbConnection.query(`
      SELECT 
        q.*,
        (SELECT user_name FROM users WHERE user_id = q.user_id) AS username
      FROM questions q
    `);
    return res.json(questions);
  } catch (error) {
    console.log("1");
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}
async function askQuestion(req, res) {
  const { title, description, userid, tag } = req.body;
  if (!title || !description || !userid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required information" });
  }

  try {
    // Generate random question ID
    const questionId = uuidv4();

    // Check if the question already exists
    const [existingQuestion] = await dbConnection.query(
      "SELECT * FROM questions WHERE title = ?",
      [title]
    );
    if (existingQuestion.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Question with this title already exists" });
    }

    // Insert new question into the database
    const created = await dbConnection.query(
      "INSERT INTO questions (title, description, user_id, tag, question_id) VALUES (?, ?, ?, ?, ?)",
      [title, description, userid, tag, questionId]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "successfull" });
  } catch (error) {
    console.log("2");
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}
async function searchQuestions(req, res) {
  const keyword = req.params.id;
  if (!keyword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Keyword is required for search" });
  }

  try {
    const [questions] = await dbConnection.query(
      `
    SELECT *, (SELECT user_name FROM users WHERE user_id = q.user_id) AS username
FROM questions q
WHERE title LIKE ? OR tag LIKE ?

    `,
      [`%${keyword}%`, `%${keyword}%`]
    );
    // console.log(questions);
    return res.json(questions);
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

module.exports = { getAllQuestion, askQuestion, searchQuestions };
