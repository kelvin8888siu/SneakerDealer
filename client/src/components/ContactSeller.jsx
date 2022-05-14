import React, {useState, useEffect} from 'react'
import CustomMap from './CustomMap';
import NavigationBar from './NavigationBar';
import UserInfo from './UserInfo';
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import {Container, Form, Button} from "react-bootstrap";
import {useLocation,  useNavigate, useParams} from "react-router-dom";
import "../styles/Contact.css";
import Message from './Message';
import testImage from "../image/test.png";
import Loading from "./Loading";

export default function ContactSeller() {
  const {user, isLoading, isAuthenticated} = useAuth0();
  const { accessToken } = useAuthToken();
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [sneakerUserInfo, setSneakerUserInfo] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const pickupLocation = location.state.pickupLocation;
  const sellerId = location.state.userId;
  const userId = user.sub;
  const sneakerName = location.state.sneakerName;
  const { id } = useParams();
  const sneakerId = id;
  const sneakerImg = location.state.sneakerImg

  function stillLoading(){
    return <div className="loading"><Loading /></div>;
  }

  async function getUserInfo(){
    const res = await fetch(`https://finalassignment-348804.ue.r.appspot.com/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json()
    setUserInfo(data);
  }

  async function getSneakerUserInfo(){
    const res = await fetch(`https://finalassignment-348804.ue.r.appspot.com/users/${sellerId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json()
    setSneakerUserInfo(data);
  }

  async function getMessages(){
    const res = await fetch(`https://finalassignment-348804.ue.r.appspot.com/messages/` + sneakerId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json()
    setMessages(data)
  }

  useEffect(()=>{
    if (isLoading) {
      stillLoading()
    }
    else {
      getUserInfo()
      getSneakerUserInfo()
      getMessages()
    }
  }, [isLoading])
  
  const [comment, setComment] = useState()
  function handleMessage(e){
    setComment(e.target.value)
  }

  async function submitMessage(data){
    console.log(data)
    await fetch('https://finalassignment-348804.ue.r.appspot.com/messages', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        setMessages((messages) => [...messages, data])
        document.getElementById("message-box").value = " "
    }).catch((error) => {
        console.error('Error:', error);
    });
}

  function submitForm(e){
    e.preventDefault()
    console.log(userInfo.username)
    const data = {
      username: userInfo.username,
      message: comment,
      sneakerId: parseInt(sneakerId),
    }
    submitMessage(data)
  }

  return (
    isAuthenticated && (
    <div className="contact-seller">
      <NavigationBar/>
        <Container className="contact-seller-container">
          <Container className="contact-seller-body">
            <Container className="user-contact-seller-info">
              <h5 className="contact-seller-sneaker-name">{sneakerName}</h5>
              <img src={sneakerImg} className="contact-seller-sneaker-img" alt="Sneaker Image"/>
              <h5 className="contact-seller-contact-information">Contact Information: </h5>
              {isLoading ? "" : <UserInfo name = {sneakerUserInfo.name} email = {sneakerUserInfo.email} address={sneakerUserInfo.address} username={sneakerUserInfo.username} phone = {sneakerUserInfo.phone} contactSeller={true}/>}
            </Container>
            <Container className="location-info">
              <h5 className="pick-up-location">Pick-Up Location:</h5>
              <p>{pickupLocation.replaceAll("%20", " ")}</p>
              <CustomMap className="location-map-container" pickupLocation = {pickupLocation}/>
            </Container>
          </Container>
          <Container className="leave-a-message">
              <Form className="comment-form">
                <h5>Leave a Message</h5>
                <Form.Group className="mb-3" >
                  <Form.Label for="message-box">Message</Form.Label>
                  <Form.Control id="message-box" onChange={handleMessage}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitForm} role="button" tabindex="0">
                  Post comment
                </Button>
              </Form>
            </Container>
            <Container>
              {
                !messages ? " " : messages.map((item) => {
                  return <Message 
                    key = {item.id}
                    username = {item.username}
                    message = {item.message}
                  />
                })
              }
            </Container>
        </Container>
    </div>
    )
  )
}
