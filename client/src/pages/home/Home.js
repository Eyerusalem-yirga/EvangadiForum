import { useContext, useEffect, useState } from "react";
import { appState } from "../../App";
import LayOut from "../../components/layOut/LayOut";
import Question from "../../components/question/Question";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import axios from "../../axiosConfig";
import { IoSearch } from "react-icons/io5";

function Home() {
  const { user } = useContext(appState);
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState(""); // Define useState hook
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(`/questions/${e.target.value}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setSearchResults(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  console.log(`home: ${user}`);
  useEffect(() => {
    // Set username only when user is available
    if (user) {
      console.log("$$$");
      console.log(user);
      setUsername(user.user);
    }
  }, [user]); // Add user as dependency to useEffect
  return (
    <LayOut>
      <section>
        <div className="w-3/4 mx-auto">
          <div className="flex justify-between mt-11">
            <Link
              to={"/home/question"}
              className="bg-blue-600 py-1 text-white px-14 rounded-sm"
            >
              Ask Question
            </Link>
            <h2 className="font-medium text-lg">welcome: {username}</h2>
          </div>
          <div className="flex justify-between">
            <div className="mt-9">
              <h2 className="font-medium text-lg pb-6 border-b-2 ">
                Questions
              </h2>
            </div>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Questions"
                className="border rounded-sm border-zinc-500 px-3 py-1 mr-2"
                onChange={(e) => handleSearch(e)}
              />
              <button type="submit">
                <IoSearch />
              </button>
            </form>
          </div>

          <Question searchResults={searchResults} />
        </div>
      </section>
    </LayOut>
  );
}

export default Home;
