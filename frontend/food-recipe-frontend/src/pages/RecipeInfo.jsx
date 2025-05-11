import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import food from '../assets/food.png';
import { getRecipeFromApi } from '../services/recipeService';
import { useParams} from 'react-router-dom';

const RecipeInfo = () => {
  const [recipe, setRecipe] = useState({});
 // no need for setSearchParams
  const {id} = useParams();

  async function getRecipe(id) {
    const recipeData = await getRecipeFromApi(id);
    console.log(recipeData);
    setRecipe(recipeData);
  }

  useEffect(() => {
    
      getRecipe(id);
    
  }, [id]); // depend on `id`!
  
  return (
    <Container className="recipe-container py-4">
      {/* Recipe Title */}
      <Row className="text-center">
        <Col>
          <h1 className="recipe-title"> {recipe.title}</h1>
        </Col>
      </Row>

      {/* Recipe Image */}
      <Row>
        <Col className="text-center">
          <img src={`http://localhost:5000/images/${recipe.coverImage}`} alt={recipe.title} className="recipe-image img-fluid" width={300} />
        </Col>
      </Row>

      {/* Recipe Info */}
      <Row className="recipe-info mt-4 d-flex justify-content-center p-4">
        <Col md={3}>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </Col>
        <Col md={6}>
          <h3>Instructions</h3>
          <p style={{ textAlign: "justify"}}>{recipe.instructions}</p>
        </Col>
      </Row>

      {/* Time Duration */}
      <Row className="text-center mt-4 p-4">
        <Col>
          <h4><strong>Time Required:</strong> {recipe.time}</h4>
        </Col>
      </Row>
    </Container>

  )
}

export default RecipeInfo