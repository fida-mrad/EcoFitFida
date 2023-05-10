import { Link, useParams } from "react-router-dom";
import { blogsController } from "../../services/blogsApi";
import { useEffect, useState } from "react";

const BlogSidebar = () => {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await blogsController.getAllBlogsExceptCurrent(id);
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="sidebar-style">
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Search </h4>
        <div className="pro-sidebar-search mb-55 mt-25">
          <form className="pro-sidebar-search-form" action="#">
            <input type="text" placeholder="Search here..." />
            <button>
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Recent Blogs </h4>
        <div className="sidebar-project-wrap mt-30">
          {blogs.map((blog) => (
            <div className="single-sidebar-blog">
              <div className="sidebar-blog-img">
                <Link
                  to={
                    process.env.PUBLIC_URL +
                    `/blog-details-standard/${blog._id}`
                  }
                >
                  <img
                    src={"http://localhost:8000/uploads/" + blog.images[0]}
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </div>
              <div className="sidebar-blog-content">
                {/*<span>Photography</span>*/}
                <h4>
                  <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    {/*T- Shart And Jeans*/}
                  </Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-widget mt-35">
        <h4 className="pro-sidebar-title">Others titles</h4>
        {blogs.map((blog) => (
          <div className="sidebar-widget-list sidebar-widget-list--blog mt-20">
            <ul>
              <li>
                <div className="sidebar-widget-list-left">
                  <input type="text" />
                  <Link
                    to={
                      process.env.PUBLIC_URL +
                      `/blog-details-standard/${blog._id}`
                    }
                  >
                    {blog.title.substr(0, 10)}
                  {blog.title.length > 10 ? "..." : ""} <span> {blog?.comments?.length}</span>{" "}
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="sidebar-widget mt-50">
        <h4 className="pro-sidebar-title">Tag </h4>
        <div className="sidebar-widget-tag mt-25">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                Clothing
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                Accessories
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                For Men
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>Women</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                Fashion
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
