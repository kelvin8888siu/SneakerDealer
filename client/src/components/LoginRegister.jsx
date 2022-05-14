import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {Button, Container} from "react-bootstrap";
import Loading from './Loading';
import "../styles/LoginRegister.css"

export default function LoginRegister() {
    const {loginWithRedirect, isLoading, isAuthenticated} = useAuth0();
    const signUp = () => loginWithRedirect({ screen_hint: "signup" });

  if (isLoading) {
    return <div className="loading"><Loading /></div>;
  }

  return (
    <div className="background-black">
      <Container className="login-register">
        {isAuthenticated ? 
          (<Button className="home-button" variant="secondary" onClick={loginWithRedirect} role="button" tabindex="0" aria-label="Home button">
              Home
          </Button>):
          
          (<Button className="login-button" variant="secondary" onClick={loginWithRedirect} role="button" tabindex="0" aria-label="Login button">
              Login
          </Button>)
          }
          <Button className="create-account-button" variant="secondary" onClick={signUp} role="button" tabindex="0" aria-label="Create account button">
            Create Account
          </Button>
      </Container>
   </div>
  )
}
