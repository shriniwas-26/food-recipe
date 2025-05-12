import React from "react";

function RecipeItem({ item, isFavourite = false, onRemoveFavourite }) {
  return (
    <div className="recipe-item">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p><strong>Ingredients:</strong> {item.ingredients}</p>
      <p><strong>Instructions:</strong> {item.instructions}</p>
      {isFavourite && (
        <button onClick={() => onRemoveFavourite(item._id)}>Remove from Favourites</button>
      )}
    </div>
  );
}

export default RecipeItem;
