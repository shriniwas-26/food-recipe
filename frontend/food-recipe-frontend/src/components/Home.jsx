import React, { useEffect, useState } from "react";
import food from '../assets/food.png';
import { Container, Row, Col } from "react-bootstrap";
import RecipeItems from "./RecipeItems";
import './recipeItems.css'
import { useNavigate } from "react-router-dom";
const Home = () => {

  const navigate = useNavigate();


  return (
    <div className="min-vh-100">
      <Container className="min-vh-100 d-flex flex-column justify-content-center">
        <Row>
          <Col className="" sm={12} lg={6}>
            <div className="h-100 ms-5 me-5 d-flex flex-column justify-content-center text-center">
              <h1 className="mt-4 mb-4">
                <span>Food</span> is only aspect of an experience.
              </h1>
              <p className="fs-sm-5">
                Tasty recipes made simple.
                Find easy, delicious, and reliable recipes for every occasion. From quick dinners to sweet treats, cook with confidence and enjoy every bite!
              </p>
              <button onClick={() => navigate("/addRecipe")} className="share-btn">Share your Recipe</button>
            </div>
          </Col>
          <Col sm={12} lg={6}>
            <div className="h-100 d-flex flex-column justify-content-center m-3">
              <img className="img-fluid d-block" src={food} />
            </div>
          </Col>
        </Row>
      </Container>
      
      <Container>
        <RecipeItems />
      </Container>
    </div>
  );
};

export default Home;
