import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { RiTimerFill } from "react-icons/ri";

const RecipeItem = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!item || !item._id) return;

    try {
      const storedLikes = localStorage.getItem('likes');
      const existingLikes = storedLikes ? JSON.parse(storedLikes) : [];
      setLiked(existingLikes.includes(item._id));
    } catch (error) {
      console.error('Failed to parse likes from localStorage:', error);
      setLiked(false);
    }
  }, [item]);

  const handleLike = () => {
    let existingLikes = JSON.parse(localStorage.getItem('likes')) || [];

    if (existingLikes.includes(item._id)) {
      existingLikes = existingLikes.filter(_id => _id !== item._id);
      setLiked(false);
    } else {
      existingLikes.push(item._id);
      setLiked(true);
    }

    localStorage.setItem('likes', JSON.stringify(existingLikes));
  };

  if (!item) return null;

  return (
    <div className="card m-3 align-items-center" style={{ width: "15rem" }}>
      <Link to={`/recipeDetails/${item._id}`} className="w-100" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="w-100">
          <img
            src={`http://localhost:5000/images/${item.coverImage}`}
            className="card-img-top"
            style={{ height: "160px" }}
            alt="Recipe Cover"
          />
        </div>
      </Link>
      <div className="card-body w-100 d-flex flex-column justify-content-between bg-light-green">
        <Link to={`/recipeDetails/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <h5 className="card-title fs-5 text-center text-decoration-none">{item.title}</h5>
        </Link>
        <div className="d-flex justify-content-between m-3">
          <div className="text-decoration-none">
            <RiTimerFill /> <span>{item.time}</span>
          </div>
          <div>
            <FaHeart onClick={handleLike} className={liked ? "text-danger" : "text-black"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
