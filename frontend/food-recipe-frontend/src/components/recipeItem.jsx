import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { RiTimerFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const RecipeItem = ({ item, onUnlike }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const existingLikes = JSON.parse(localStorage.getItem("likes")) || [];
    setLiked(existingLikes.includes(item._id));
  }, [item._id]);

  const handleLike = () => {
    let existingLikes = JSON.parse(localStorage.getItem("likes")) || [];

    if (existingLikes.includes(item._id)) {
      // Unlike
      existingLikes = existingLikes.filter((id) => id !== item._id);
      setLiked(false);
      localStorage.setItem("likes", JSON.stringify(existingLikes));

      if (onUnlike) {
        onUnlike(item._id); // notify parent to remove this card
      }
    } else {
      // Like
      existingLikes.push(item._id);
      setLiked(true);
      localStorage.setItem("likes", JSON.stringify(existingLikes));
    }
  };

  return (
    <div className="card m-3 align-items-center" style={{ width: "15rem" }}>
      <Link
        to={`/recipeDetails/${item._id}`}
        className="w-100"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="w-100">
          <img
            src={`http://localhost:5000/images/${item.coverImage}`}
            className="card-img-top"
            style={{ height: "160px" }}
            alt="..."
          />
        </div>
      </Link>
      <div className="card-body w-100 d-flex flex-column justify-content-between bg-light-green">
        <Link
          to={`/recipeDetails/${item._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h5 className="card-title fs-5 text-center">{item.title}</h5>
        </Link>
        <div className="d-flex justify-content-between m-3">
          <div>
            <RiTimerFill /> <span>{item.time}</span>
          </div>
          <div>
            <FaHeart
              onClick={handleLike}
              className={liked ? "text-danger" : "text-black"}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;