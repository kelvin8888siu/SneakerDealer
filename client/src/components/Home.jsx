import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import AllSneakers from './AllSneakers';
import { useAuthToken } from "../AuthTokenContext";
import NavigationBar from './NavigationBar';
import Container from "react-bootstrap/Container";
import "../styles/Home.css"
import Loading from './Loading';

function App() {
  const {isLoading} = useAuth0();
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
    <div className="home">
        <NavigationBar/>
        <br></br>
        <br></br>
        <Container className="sneaker-container">
            {isLoading ?  "" : allSneakers.map((item)=>{
                return <AllSneakers 
                  key = {item.id}
                  id = {item.id}
                  image = {item.image}
                  name = {item.name}
                  condition = {item.condition}
                  price = {item.price}
                />
              })
            }  
        </Container>
        <br></br>
    </div>
  );
}

export default App;
