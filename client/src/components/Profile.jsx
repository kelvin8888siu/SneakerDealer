import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../AuthTokenContext";
import NavigationBar from './NavigationBar';
import DataTable from './DataTable';
import UserInfo from './UserInfo';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ProfileForm from './ProfileForm';
import Transactions from './Transactions';
import Loading from './Loading';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [sneakers, setSneakers] = useState([]); // Sneakers that are not sold
  const [sneakersSold, setSneakersSold] = useState([]) // Sneakers that have been sold
  const [userInfo, setUserInfo] = useState([]);
  const { accessToken } = useAuthToken();
  const [quantity, setQuantity] = useState({});
 
  const navigate = useNavigate();

  function stillLoading(){
    return <div className="loading"><Loading /></div>;
  }

  async function getSneakers(){
    const res = await fetch(`https://finalassignment-348804.ue.r.appspot.com/users/sneakers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json()
    for( var i = 0; i < data.length; i++){ 
      quantity[(data[i].id)] = data[i].quantity;
      if ( data[i].status === "Sold") { 
        setSneakersSold((sneakersSold) => [...sneakersSold, data[i]])
      }
      else {
        setSneakers((sneakers) => [...sneakers, data[i]])
        setQuantity(quantity);
      }
    }
  }
  
  async function getUserInfo(){
    const res = await fetch(`https://finalassignment-348804.ue.r.appspot.com/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json()
    setUserInfo(data)
  }


  useEffect(()=>{
    if (accessToken === undefined){
      stillLoading()
    }
    else {
      getUserInfo()
      getSneakers()
    }
  }, [accessToken])

  async function updateStatus(e){
    const sneakerId = e.target.id
    
    const requestOptions = {
      method: 'PUT',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({status: "Sold"})
    };
  
    const response = await fetch('https://finalassignment-348804.ue.r.appspot.com/sneakers/' + sneakerId, requestOptions)
    const data = await response.json()
    
    setSneakersSold((sneakersSold) => [...sneakersSold, data]);
    
    for (let i = 0; i < sneakers.length; i++) {
      if(sneakers[i].id === parseInt(sneakerId)){
        sneakers.splice(i, 1)
      }
    }

    //sneakers.filter(sneakers => parseInt(sneakers.id) === parseInt(sneakerId))
    if (sneakers.length === 0){
      setSneakers([])
    } else {
      setSneakers([...sneakers])
    }
    
  }

  const [firstName, setFirstName] = useState('')
  function handleFirstNameChange(e){
      setFirstName(e.target.value)
  }

  const [surname, setSurname] = useState('')
  function handleSurnameChange(e){
      setSurname(e.target.value)
  }

  const [username, setUsername] = useState('')
  function handleUsernameChange(e){
      setUsername(e.target.value)
  }

  const [address1, setAddress1] = useState('')
  function handleAddress1Change(e){
      setAddress1(e.target.value)
  }

  const [address2, setAddress2] = useState('')
  function handleAddress2Change(e){
      setAddress2(e.target.value)
  }

  const [postalCode, setPostalcode] = useState('')
  function handlePostalcodeChange(e){
      setPostalcode(e.target.value)
  }

  const [city, setCity] = useState('')
  function handleCityChange(e){
      setCity(e.target.value)
  }

  const [region, setRegion] = useState('')
  function handleRegionChange(e){
      setRegion(e.target.value)
  }

  const [country, setCountry] = useState('')
  function handleCountryChange(e){
      setCountry(e.target.value)
  }

  const [phone, setPhone] = useState('')
  function handlePhoneNumChange(e){
    setPhone(e.target.value)
  }

  async function submitUser(data){
    await fetch('https://finalassignment-348804.ue.r.appspot.com/users/' + userInfo.id, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        navigate('/app')
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function submitForm(){
    const name = firstName+ " " + surname
    const address = address1 + " " + address2 + " " + city + " " + region + " " + country + " " + postalCode
    const usern = username
    const data = {
        name: name,
        email: userInfo.email,
        address: address,
        username: usern,
        phone: phone,
    }
    submitUser(data)
    //window.location.reload();
  }

  return (
    isAuthenticated && (
      <div className="user-profile-transaction">
        <NavigationBar/>
        <br></br>
        <Container className="profile">
            <div className="profile-info border">
                <img className="profile-photo" src={user.picture} alt="Current user profile image"/>
                {!accessToken ? " " : <UserInfo name = {userInfo.name} email = {userInfo.email} address={userInfo.address} username={userInfo.username} phone = {userInfo.phone}/>}
            </div>
            <div className="profile-tabs border">
              <Tabs defaultActiveKey="account-setting" id="Profile tab" className="mb-3">
                  <Tab eventKey="account-setting" title="Account Setting">
                    <Container>
                      {!accessToken ? " " : 
                        <ProfileForm
                          handleFirstNameChange = {handleFirstNameChange}
                          handleSurnameChange = {handleSurnameChange}
                          handleUsernameChange = {handleUsernameChange}
                          handleAddress1Change = {handleAddress1Change}
                          handleAddress2Change = {handleAddress2Change}
                          handlePostalcodeChange = {handlePostalcodeChange}
                          handleCityChange = {handleCityChange}
                          handleRegionChange = {handleRegionChange}
                          handleCountryChange = {handleCountryChange}
                          handlePhoneNumChange = {handlePhoneNumChange}
                          submitForm = {submitForm}/>}
                    </Container>
                  </Tab>
                  <Tab eventKey="sneakers" title="Sneakers">
                      {!accessToken && quantity ? " " : <DataTable lstSneaker = {sneakers} updateStatus = {updateStatus} quantity={quantity}/>}
                  </Tab>
                  <Tab eventKey="transaction-history" title="Transaction History">
                    {!accessToken ? " " : <Transactions sneakersSold={sneakersSold}/>}
                  </Tab>
              </Tabs>
            </div>
        </Container>
        <br></br>
      </div>
    )
  );
};

export default Profile;
