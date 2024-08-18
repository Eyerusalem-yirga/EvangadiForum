import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import LayOut from "../../components/layOut/LayOut";
import profile from "../../../src/assets/img/profile.jpg";
import { Link } from "react-router-dom";
import axios from "../../axiosConfig";
import { useParams } from "react-router-dom";
import { appState } from "../../App";

function Answer() {
  const token = localStorage.getItem("token");

  const [answers, SetAnswers] = useState([]);
  const [questionid, setQuestionid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { user } = useContext(appState);
  const userid = user["user_id"];
  // console.log(userid);
  const { id } = useParams();

  const answerDoc = useRef();
  const handleOpstAnswer = async () => {
    const answer = answerDoc.current.value;
    // console.log("click");
    if (!answer) {
      setErrorMessage("Please provide all required information");
      return;
    }
    try {
      const response = await axios.post(
        "/answers/give-answers",
        {
          answer,
          id,
          userid,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setSuccessMessage("posted successful");
      getAllAnswers();
    } catch (error) {
      setErrorMessage(error.response.data.msg);
      console.log("error in api request in frontend");
    }
  };
  useEffect(() => {
    // Fetch data based on ID when component mounts
    getAllAnswers();
  }, []);

  async function getAllAnswers() {
    try {
      const response = await axios.get(`/answers/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data);
      if (response.data && response.data.length > 0) {
        console.log("--");
        // Check if response.data is not empty
        SetAnswers(response.data);
      }
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  }
  return (
    <>
      <LayOut>
        <div className="w-3/4 mx-auto mb-7">
          <div className="mt-9 mb-4">
            <h2 className="font-semibold text-xl pb-1  ">Question</h2>
            {answers.length > 0 && (
              <>
                <p>{answers[0].title}</p>
                <p className="text-sm text-slate-500">
                  {answers[0].description}
                </p>
              </>
            )}
          </div>
          <div className="py-2 border-y-2">
            <h1 className="text-xl font-semibold">Answer From The Community</h1>
          </div>
          {answers.length > 1 && (
            <>
              {answers.map((answer, index) => {
                return (
                  <div className="flex gap-6" key={index}>
                    <div>
                      <div className="w-24">
                        <img src={profile} alt="" />
                      </div>
                      <h2 className="text-center">{answer.username}</h2>
                    </div>
                    <div className="flex w-11/12 justify-between items-center">
                      <p>{answer.answer}</p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          <h1 className="text-xl font-semibold text-center mb-5 ">
            Answer The Top Question
          </h1>
          <div className=" text-center mb-3">
            <Link to={"/home"} className="text-sm text-slate-500">
              Go to Question page
            </Link>
          </div>
          <div className="flex justify-center">
            <textarea
              className="textareas border-2 w-11/12 mx-auto h-28  focus:border-slate-400 mb-6 rounded-lg p-2"
              type="text"
              name=""
              id=""
              ref={answerDoc}
              placeholder="your answer ..."
            ></textarea>
          </div>
          <div className=" w-11/12 mx-auto">
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-center">{successMessage}</p>
            )}
            <button
              onClick={handleOpstAnswer}
              className="bg-blue-600 py-1 text-white px-14 rounded-sm"
            >
              Post Your Answer
            </button>
          </div>
        </div>
      </LayOut>
    </>
  );
}

export default Answer;
