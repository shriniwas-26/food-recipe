import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { getRecipeFromApi } from '../services/recipeService';
import { useParams } from 'react-router-dom';

const RecipeInfo = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getRecipe(id) {
      const recipeData = await getRecipeFromApi(id);
      console.log(recipeData);
      setRecipe(recipeData);
    }
    getRecipe(id);
  }, [id]);

  return (
    <Container className="recipe-container py-4">
      {/* Title */}
      <Row className="text-center mb-4">
        <Col>
          <h1 className="recipe-title">{recipe.title}</h1>
        </Col>
      </Row>

      {/* Main content: Image & Details */}
      <Row className="d-flex align-items-start">
        {/* Image */}
        <Col md={5} className="mb-4">
          <img
            src={`http://localhost:5000/images/${recipe.coverImage}`}
            alt={recipe.title}
            className="img-fluid rounded shadow"
            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
          />
        </Col>

        {/* Ingredients and Instructions */}
        <Col md={7}>
          <div>
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3>Instructions</h3>
            <p style={{ textAlign: 'justify' }}>{recipe.instructions}</p>
          </div>
        </Col>
      </Row>

      {/* Time */}
      <Row className="text-center mt-5">
        <Col>
          <h4><strong>Time Required:</strong> {recipe.time}</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeInfo;
