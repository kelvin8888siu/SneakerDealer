import React from 'react'
import {Spinner, Container} from "react-bootstrap";
import "../styles/Loading.css";

export default function Loading() {
  return (
    <div className="background-blue">
      <Container className="loading-screen">
          <h1 className="loading-title">LOADING</h1>
          <Spinner className="spinner" style={{ width: '5rem', height: '5rem'}} animation="border"/>
      </Container>
    </div>
  )
}
