import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from '../src/components/Home';
import Profile from '../src/components/Profile';
import MainPage from '../src/components/MainPage';
import LoginRegister from '../src/components/LoginRegister';
import Sneaker from '../src/components/Sneaker';
import NotFound from '../src/components/NotFound';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import VerifyUser from './components/VerifyUser';
import AuthDebugger from './components/AuthDebugger';
import { AuthTokenProvider } from "../src/AuthTokenContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './components/Logout';
import SellForm from './components/SellForm';
import Transactions from './components/Transactions';
import Contact from './components/ContactSeller';
import Loading from './components/Loading';

const requestedScopes = [
  "write:user",
  "write:review",
  "write:sneaker",
  "write:transaction",
  "read:sneaker",
  "read:user",
  "read:transaction",
  "read:review",
  "edit:user",
  "edit:sneaker",
  "edit:review",
  "delete:user",
  "delete:sneaker",
  "delete:review",
];

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/loginregister" replace />;
  }

  return children;
}

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-x2lg4k5x.us.auth0.com"
      clientId="wHRlfxMwTYaEj7dyJeHVqXCaLSlZRiEB"
      redirectUri={`https://sneakers-kelvin97siu-gmailcom.vercel.app/verify-user`}
      audience="https://api.sneakers"
      scope={requestedScopes.join(" ")}
    >
      <AuthTokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify-user" element={<VerifyUser />} />
            <Route path="/app" element={<RequireAuth><Home/></RequireAuth>}/>

            <Route path="/app/profile" element={<RequireAuth><Profile/></RequireAuth>}/>
            <Route path="/app/sell" element={<RequireAuth><SellForm /></RequireAuth>} />
            <Route path="/app/transactions" element={<RequireAuth><Transactions /></RequireAuth>}/>

            <Route path="/app/details/:id" element={<Sneaker/>}/>
            <Route path="/loginregister" element={<LoginRegister />} />
            <Route path="/app/logout" element={<Logout />} />
            <Route path="/app/sneaker/:id/contact" element={<RequireAuth><Contact /></RequireAuth>} />

            <Route path="/app/debugger" element={<AuthDebugger />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/app/loading" element={<Loading/>} />
          </Routes>
        </BrowserRouter>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
