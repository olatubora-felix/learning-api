import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../services/api";
import { useParams } from "react-router-dom";

export const GetPosts = () => {
  const { go } = useParams();
  const [post, setPost] = useState({});
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getPost = async () => {
      setStatus("loading");
      try {
        const res = await axios(`${baseURL}/posts/${go}`);
        const data = await res.data;
        setStatus("success");
        setPost(data);
      } catch (error) {
        console.log(error);
        if (error.response?.data) {
          setError(error.response.data.message);
        }
        setError("An error occurred");
        setStatus("error");
      }
    };
    getPost();
  }, [go]);
  return go ? (
    <div>
      <h2>Posts</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>{error}</p>}
      {status === "success" && <p>{post.title}</p>}
    </div>
  ) : null;
};
