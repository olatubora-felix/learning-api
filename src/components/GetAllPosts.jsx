import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { baseURL } from "../services/api";
import { Link } from "react-router-dom";

export const GetAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      setStatus("loading");
      try {
        const res = await axios(`${baseURL}/posts`);
        const data = await res.data;
        setStatus("success");
        setPosts(data);
      } catch (error) {
        console.log(error);
        if (error.response?.data) {
          setError(error.response.data.message);
        }
        setError("An error occurred");
        setStatus("error");
      }
    };
    getPosts();
  }, []);

  return (
    <Fragment>
      {/* Get POSTs */}
      <h2>Posts</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>{error}</p>}
      <ul>
        {posts?.posts?.map((post) => (
          <li key={post.id}>
            <Link to={`/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};
