import React, { useEffect, useState } from "react";
import profile from "../../../src/assets/img/profile.jpg";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "../../axiosConfig";
import { FaAngleDown } from "react-icons/fa6";

function Question({ searchResults }) {
  const token = localStorage.getItem("token");
  const [questions, setQuestions] = useState([]);
  const [showDescription, setShowDescription] = useState({});

  useEffect(() => {
    // Initialize questions and showDescription states
    if (searchResults.length > 0) {
      setQuestions(searchResults);
      const initialShowDescriptionState = {};
      searchResults.forEach((question) => {
        initialShowDescriptionState[question.questionid] = false;
      });
      setShowDescription(initialShowDescriptionState);
    } else {
      getAllQuestions();
    }
  }, [searchResults]);

  async function getAllQuestions() {
    try {
      const data = await axios.get("/questions/all-questions", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const sortedQuestions = data.data.sort((a, b) => b.id - a.id);
      const initialShowDescriptionState = {};
      sortedQuestions.forEach((question) => {
        initialShowDescriptionState[question.questionid] = false;
      });
      setShowDescription(initialShowDescriptionState);
      setQuestions(sortedQuestions);
    } catch (error) {
      console.log(error.response);
    }
  }

  const handleDropDown = (questionId) => {
    setShowDescription((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  return (
    <>
      {questions &&
        questions.map((question) => (
          <div className="border-b-2" key={question.question_id}>
            <div className="flex gap-6">
              <div>
                <div className="w-24">
                  <img src={profile} alt="" />
                </div>
                <h2 className="text-center">qqqq{question.username}</h2>
              </div>
              <div className="flex w-11/12 justify-between items-center">
                <Link to={`./answer/${question.question_id}`}>
                  <p>{question.title}</p>
                </Link>
                {showDescription[question.id] ? (
                  <FaAngleDown
                    onClick={() => handleDropDown(question.question_id)}
                  />
                ) : (
                  <IoIosArrowForward
                    onClick={() => handleDropDown(question.question_id)}
                  />
                )}
              </div>
            </div>
            {showDescription[question.question_id] && (
              <div className="p-6">
                <p>
                  Description: - <span>{question.description}</span>
                </p>
              </div>
            )}
          </div>
        ))}
    </>
  );
}

export default Question;
