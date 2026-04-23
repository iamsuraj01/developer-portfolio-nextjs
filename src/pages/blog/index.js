import { Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { SingleBlog } from "../../components";
import Link from "../../components/link";
import { ThemeContext } from "../../contexts/theme-context";
import { blogData } from "../../data/blog-data";

function BlogPage() {
  const [search, setSearch] = useState("");
  const { theme } = useContext(ThemeContext);

  const filteredArticles = blogData.filter((blog) => {
    const content = blog.title + blog.description + blog.date;
    return content.toLowerCase().includes(search.toLowerCase());
  });

  const searchStyles = {
    color: theme.tertiary,
    width: "40%",
    height: "2.75rem",
    outline: "none",
    border: "none",
    borderRadius: "20px",
    padding: "0.95rem 1rem",
    fontFamily: "'Noto Sans TC', sans-serif",
    fontWeight: 500,
    fontSize: "0.9rem",
    backgroundColor: theme.secondary,
    boxShadow:
      theme.type === "dark"
        ? "inset 3px 3px 6px #ffffff10, inset -3px -3px 6px #00000060"
        : "inset 3px 3px 6px #ffffffbd, inset -3px -3px 6px #00000030",
  };

  const homeStyles = {
    color: theme.secondary,
    position: "absolute",
    top: 25,
    left: 25,
    padding: "7px",
    borderRadius: "50%",
    boxSizing: "content-box",
    fontSize: "2rem",
    cursor: "pointer",
    boxShadow:
      theme.type === "dark"
        ? "3px 3px 6px #ffffff40, -3px -3px 6px #00000050"
        : "3px 3px 6px #ffffff40, -3px -3px 6px #00000050",
    transition: "all 0.3s ease-in-out",
  };

  return (
    <div className="blogPage" style={{ backgroundColor: theme.secondary }}>
      <div
        className="blogPage--header"
        style={{ backgroundColor: theme.primary }}
      >
        <Link href="/">
          <AiOutlineHome
            style={homeStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = theme.tertiary;
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = theme.secondary;
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </Link>
        <h1 style={{ color: theme.secondary }}>Blogs</h1>
      </div>
      <div className="blogPage--container">
        <div className="blog--search">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blog..."
            style={searchStyles}
          />
        </div>
        <div className="blogs--container">
          <Grid
            className="blog-grid"
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {filteredArticles.reverse().map((blog) => (
              <SingleBlog
                theme={theme}
                title={blog.title}
                desc={blog.description}
                date={blog.date}
                image={blog.image}
                url={blog.url}
                key={blog.id}
                id={blog.id}
              />
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
