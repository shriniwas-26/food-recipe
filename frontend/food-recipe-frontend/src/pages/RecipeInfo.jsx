import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import food from '../assets/food.png';

const RecipeInfo = () => {

    const recipe ={
        ingredients: ["Shrimp", " butter", " garlic", ],
        title: "Creamy Mushroom Risotto",
        instructions: "In a pot, heat olive oil and sauté chopped onion and minced garlic until soft. Add sliced mushrooms and cook until browned. Stir in Arborio rice and cook for 1-2 minutes until lightly toasted. Pour in white wine and stir until absorbed. Gradually add warm vegetable broth, one ladle at a time, stirring constantly until the liquid is absorbed and rice is creamy and tender. Stir in butter, grated Parmesan, and chopped parsley. Season with salt and black pepper to taste. Serve hot, garnished with extra Parmesan and parsley.",
        time: 25
    }
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
          <img src={ food } alt={recipe.title} className="recipe-image img-fluid" width={300} />
        </Col>
      </Row>

      {/* Recipe Info */}
      <Row className="recipe-info mt-4 d-flex justify-content-center p-4">
        <Col md={3}>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
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
          <h4><strong>Time Required:</strong> {recipe.time} minutes</h4>
        </Col>
      </Row>
    </Container>

  )
}

export default RecipeInfo