import React, { useEffect, useState } from 'react'
import {useLocation,  useNavigate,  useParams} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import NavigationBar from './NavigationBar';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import testImage from "../image/test.png"
import Container from 'react-bootstrap/Container';
import "../styles/Sneaker.css";
import Loading from "./Loading";

export default function Sneaker() {
  const navigate = useNavigate();

  const location = useLocation();
  const { id } = useParams();
  const {isLoading} = useAuth0();
  const [sneaker, setSneaker] = useState([])
  const { accessToken } = useAuthToken();
  const [pickupLocation, setPickupLocation] = useState();
  
  function stillLoading(){
    return <div className="loading"><Loading /></div>;
  }

  async function getSneaker(){
    const res = await fetch(`https://finalassignment-348804.ue.r.appspot.com/sneakers/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    setSneaker(data);
  }

  useEffect(()=>{
    if (isLoading) {
      stillLoading()
    }
    else {
      getSneaker()
    }
  }, [isLoading])

  
  useEffect(()=>{
    if (sneaker.length === 0){
      
    } else {
      setPickupLocation(sneaker.location.replaceAll(" ","%20"))
    }
  }, [sneaker])
  
  console.log(sneaker.userId)
  console.log()
  function handleClick(e){
    e.preventDefault()
    navigate(`/app/sneaker/${id}/contact`, { state: {pickupLocation: pickupLocation, sneakerId: sneaker.id, userId: sneaker.userId, sneakerName: sneaker.name, sneakerImg: sneaker.image} })
  }

  return (
    <div className="sneaker-detail">
        <NavigationBar/>
        <Container className="sneaker-detail-container">
          <Row className="item">
            <Col className="sneaker-img">
              <img src={sneaker.image} className="img-fluid" alt="Sneaker Image"/>
            </Col>
            <Col className="sneaker-info">
              <div className="detail-header">
                <h2 className="sneaker-detail-name">{!isLoading ? sneaker.name : " "}</h2>
                <h4 className="sneaker-detail-price">{!isLoading ? sneaker.price : " "}</h4>
              </div>
              <br></br>
              <h5>Product Details: </h5>
              <ul className="details-list">
                <li>Brand: {!isLoading ? sneaker.brand : " "}</li>
                <li>Size: {!isLoading ? sneaker.type : " "} {!isLoading ? sneaker.size : " "}</li>
                <li>Quantity: {!isLoading ? sneaker.quantity : " "}</li>
                <li>Condition: {!isLoading ? sneaker.condition : " "}</li>
              </ul>
              <Button className="contact-seller-button" id="contact seller" variant="primary" onClick={handleClick} role="button" tabindex="0"> Contact Seller </Button>
            </Col>
          </Row>
        </Container>
    </div>
  )
}
