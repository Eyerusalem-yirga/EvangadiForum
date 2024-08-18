import React, { useContext, useState } from "react";
import LayOut from "../../components/layOut/LayOut";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "../../axiosConfig";
import { appState } from "../../App";

function AddQuestion() {
  const navigator = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useContext(appState);
  const [selectedValue, setSelectedValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const titleDoc = useRef();
  const descriptionDoc = useRef();
  const tagDoc = useRef();
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handlePost = async () => {
    const title = titleDoc.current.value;
    const description = descriptionDoc.current.value;
    const tag = selectedValue;
    const userid = user["user_id"];

    if (!title || !description) {
      setErrorMessage("Please provide all required information");
      return;
    }

    if (!userid) {
      setErrorMessage("Please sign in");
      return;
    }
    try {
      await axios.post(
        "/questions/ask-question",
        {
          title,
          description,
          tag,
          userid,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setSuccessMessage("posted successfuly");
      navigator("/home");
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <LayOut>
        <section>
          <div className="mb-10 mt-5">
            <h1 className="font-semibold text-xl pb-1 text-center">
              Steps to Write a Good Question
            </h1>
            <div className="flex justify-center mb-7">
              <ul>
                <li className="list-disc">
                  Summarize your problem in a one-line title.
                </li>
                <li className="list-disc">
                  Describe your problem in more detail.
                </li>
                <li className="list-disc">
                  Describe what you've tried and what you expected to happen.
                </li>
                <li className="list-disc">
                  Review your question and post it to the site.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-xl pb-1 text-center">
                Choose a Tag for Your Question:
              </h2>
              <form className="flex justify-center gap-20 mt-6">
                <div>
                  <input
                    className="radiobutton mr-2"
                    type="radio"
                    id="reactTag"
                    onChange={handleRadioChange}
                    name="tags"
                    value="React"
                  />
                  <label htmlFor="reactTag">React</label>
                  <br />

                  <input
                    className="radiobutton mr-2"
                    type="radio"
                    onChange={handleRadioChange}
                    id="reactRouterTag"
                    name="tags"
                    value="React Router"
                  />
                  <label htmlFor="reactRouterTag">React Router</label>
                  <br />

                  <input
                    className="radiobutton mr-2"
                    type="radio"
                    id="axiosTag"
                    onChange={handleRadioChange}
                    name="tags"
                    value="Axios"
                  />
                  <label htmlFor="axiosTag">Axios</label>
                  <br />

                  <input
                    className="radiobutton mr-2"
                    type="radio"
                    id="fetchAPITag"
                    onChange={handleRadioChange}
                    name="tags"
                    value="Fetch API"
                  />
                  <label htmlFor="fetchAPITag">Fetch API</label>
                  <br />

                  <input
                    className="radiobutton mr-2"
                    type="radio"
                    onChange={handleRadioChange}
                    id="reduxTag"
                    name="tags"
                    value="Redux"
                  />
                  <label htmlFor="reduxTag">Redux</label>
                  <br />
                </div>
                <div>
                  <input
                    className="radiobutton mr-2"
                    type="radio"
                    id="nodeJSTag"
                    name="tags"
                    value="Node.js"
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="nodeJSTag">Node.js</label>
                  <br />

                  <input
                    className="radiobutton mr-2"
                    type="radio"
                    id="expressTag"
                    name="tags"
                    value="Express.js"
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="expressTag">Express.js</label>
                  <br />

                  <input
                    className="radiobutton mr-2"
                    type="radio"
                    id="mysqlTag"
                    name="tags"
                    value="MySQL"
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="mysqlTag">MySQL</label>
                  <br />

                  <input
                    className="radiobutton mr-2"
                    type="radio"
                    id="otherTag"
                    name="tags"
                    value="Other"
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="otherTag">Other</label>
                  <br />
                </div>
              </form>
            </div>
            <h1 className="text-xl font-semibold text-center mb-5 mt-3">
              Ask a Public Question
            </h1>
            <div className="text-center mb-3">
              <Link to={"/home"} className="text-sm text-slate-500  ">
                Go to Question Page
              </Link>
            </div>
            <div className="flex justify-center">
              <input
                className="textareas border-2 w-9/12 mx-auto h-10  focus:border-slate-400 mb-6 rounded-lg p-2"
                type="text"
                name=""
                ref={titleDoc}
                id=""
                placeholder="Title"
              ></input>
            </div>
            <div className="flex justify-center">
              <textarea
                className="textareas border-2 w-9/12 mx-auto h-28  focus:border-slate-400 mb-6 rounded-lg p-2"
                type="text"
                ref={descriptionDoc}
                name=""
                id=""
                placeholder="Question description..."
              ></textarea>
            </div>
            <div className=" w-9/12 mx-auto">
              {errorMessage && (
                <p className="text-red-500 text-center">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-green-500 text-center">{successMessage}</p>
              )}
              <button
                type="submit"
                onClick={handlePost}
                className="bg-blue-600 py-1 text-white px-14 rounded-sm"
              >
                Post Your Question
              </button>
            </div>
          </div>
        </section>
      </LayOut>
    </>
  );
}

export default AddQuestion;
