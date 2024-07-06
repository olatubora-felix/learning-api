import axios from "axios";
import { useState } from "react";
import { baseURL } from "../services/api";

export const AddPost = () => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    title: "",
    body: "",
  });

  const handeChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    if (values.title.trim() === "") {
      setError((prevState) => ({
        ...prevState,
        title: "Title is required",
      }));
      return setStatus("");
    }
    if (values.body.trim() === "") {
      setError((prevState) => ({
        ...prevState,
        body: "Body is required",
      }));
      return setStatus("");
    }

    try {
      const data = {
        ...values,
        userId: 10,
      };
      const res = await axios.post(`${baseURL}/posts/add`, data);
      console.log(res);
      setStatus("success");
      setError({});
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        setError({
          message: error.response.data.message,
        });
        setStatus("error");
      }
    }
  };
  console.log(values);
  return (
    <div>
      <h1>Add Post</h1>
      {status === "error" && <h6 className="error">{error.message}</h6>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handeChange}
          />
          {error?.title && <h6 className="error">{error.title}</h6>}
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            name="body"
            value={values.body}
            onChange={handeChange}
          />
          {error?.body && <h6 className="error">{error.body}</h6>}
        </div>
        <button type="submit">
          {status === "loading" ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
