import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import AllSneakers from './AllSneakers';
import { useAuthToken } from "../AuthTokenContext";
import Row from "react-bootstrap/Row";
import NavigationBar from './NavigationBar';
import Container from "react-bootstrap/Container";
import Loading from './Loading';

export default function MainPage() {
    const {isLoading} = useAuth0();
    const navigate = useNavigate();
    const {logout} = useAuth0();
    const [allSneakers, setAllSneakers] = useState([])
    const { accessToken } = useAuthToken();

    function stillLoading(){
        return <div className="loading"><Loading /></div>;
    }

    async function getAllSneakers(){
      const res = await fetch("https://finalassignment-348804.ue.r.appspot.com/sneakers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      setAllSneakers(data)
    }

  useEffect(()=>{
    if (isLoading) {
      stillLoading()
    }
    else {
      getAllSneakers()
    }
  }, [isLoading])

  return (
    <div className="main-page">
        <NavigationBar/>
        <Container fluid className="container">
          <Row xs={1} md={5} className="g-4">
            {isLoading ?  "" : allSneakers.map((item)=>{
                return <AllSneakers 
                  id = {item.id}
                  image = {item.image}
                  name = {item.name}
                  condition = {item.condition}
                  price = {item.price}
                />
              })
            }  
          </Row>
        </Container>
    </div>
  )
}




