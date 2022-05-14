import React from 'react'
import {Form, Button} from 'react-bootstrap';
import AddressFormContent from './AddressFormContent';
import "../styles/Profile.css";

export default function ProfileForm({handleFirstNameChange, handleSurnameChange, handleUsernameChange, handleAddress1Change, handleAddress2Change, handlePostalcodeChange, handleCityChange, handleRegionChange, handleCountryChange, handlePhoneNumChange, submitForm}) {
  return (
    <div className="profile-form">
        <Form>
            <Form.Group className="form-first-name mb-3" >
                <Form.Label for="firstName">First Name:</Form.Label>
                <Form.Control id="firstName" placeholder="First Name" onChange={handleFirstNameChange}/>
            </Form.Group>
            <Form.Group className="form-surname mb-3" >
                <Form.Label for="surname">Surname:</Form.Label>
                <Form.Control id="surname" placeholder="Surname" onChange={handleSurnameChange}/>
            </Form.Group>
            <Form.Group className="form-username mb-3" >
                <Form.Label for="username" >Username:</Form.Label>
                <Form.Control id="username" placeholder="Username" onChange={handleUsernameChange}/>
            </Form.Group>
            <AddressFormContent
                handleAddress1Change = {handleAddress1Change}
                handleAddress2Change = {handleAddress2Change}
                handlePostalcodeChange = {handlePostalcodeChange}
                handleCityChange = {handleCityChange}
                handleRegionChange = {handleRegionChange}
                handleCountryChange = {handleCountryChange}
            />
            <Form.Group className="form-phone-number mb-3" >
                <Form.Label for="phoneNumber" >Phone Number:</Form.Label>
                <Form.Control id="phoneNumber" placeholder="Phone Number" onChange={handlePhoneNumChange}/>
            </Form.Group>
            <Button className="update-button" variant="primary" onClick={submitForm} role="button" tabindex="0" aria-label="Update sneaker detail form button">
                Update
          </Button>
        </Form>
        <br></br>
    </div>
  )
}
