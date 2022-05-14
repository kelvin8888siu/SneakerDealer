import React from 'react'
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css'


export default function AllSneakers({id, image, name, price, condition}) {
  const navigate = useNavigate();
  return (
    <Card key={id} className="sneaker-cards" onClick={() => navigate(`/app/details/${id}`)}>
      <Card.Img className="sneaker-cards-img" variant="top" src={image} alt="Sneaker Image"/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {condition}
        </Card.Text>
        <Card.Text className="price">
          {price} 
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
