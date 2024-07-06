import { AddPost } from "../components/AddPost";
import { GetAllPosts } from "../components/GetAllPosts";
import { GetPosts } from "../components/GetPosts";

const Home = () => {
  return (
    <div>
      <h1>Get All Posts</h1>
      <section className="grid">
        <div>
          <GetAllPosts />
        </div>
        <div>
          <GetPosts />
        </div>
        <div>
          <AddPost />
        </div>
      </section>
    </div>
  );
};

export default Home;
