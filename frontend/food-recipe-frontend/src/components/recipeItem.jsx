import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { RiTimerFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const RecipeItem = ({item}) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this item is already liked on mount
    const existingLikes = JSON.parse(localStorage.getItem('likes')) || [];
    setLiked(existingLikes.includes(item._id));
  }, [item._id]);

  const handleLike = () => {
    let existingLikes = JSON.parse(localStorage.getItem('likes')) || [];

    if (existingLikes.includes(item._id)) {
      // Unlike: remove the ID
      existingLikes = existingLikes.filter(_id => _id !== item._id);
      setLiked(false);
    } else {
      // Like: add the ID
      existingLikes.push(item._id);
      setLiked(true);
    }

    localStorage.setItem('likes', JSON.stringify(existingLikes));

  };

  return (
    <div
      key={item._id}
      className="card m-3 align-items-center "
      style={{ width: "15rem" }}
    >
      {/* You don't need to import url, use the base URL directly */}
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
          <h5 className="card-title fs-5 text-center text-decoration-none">
            {item.title}
          </h5>
        </Link>
        <div className="d-flex justify-content-between m-3">
          <div className="text-decoration-none">
            <RiTimerFill /> <span>{item.time}</span>
          </div>
          <div>
            <FaHeart
              onClick={handleLike}
              className={liked ? "text-danger" : "text-black"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
