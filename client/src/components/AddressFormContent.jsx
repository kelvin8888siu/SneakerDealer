import React from 'react'
import {Form} from 'react-bootstrap';
import '../styles/Profile.css'

export default function AddressFormContent({handleAddress1Change, handleAddress2Change, handlePostalcodeChange, handleCityChange, handleRegionChange, handleCountryChange}) {
  return (
    <div className="address-form">
        <Form.Group className="form-address-line-1 mb-3" >
            <Form.Label for="addressLine1" >Address Line 1:</Form.Label>
            <Form.Control id="addressLine1" placeholder="Address Line 1" onChange={handleAddress1Change}/>
        </Form.Group>
        <Form.Group className="form-address-line-2 mb-3" >
            <Form.Label for="addressLine2">Address Line 2:</Form.Label>
            <Form.Control id="addressLine2" placeholder="Address Line 2" onChange={handleAddress2Change}/>
        </Form.Group>
        <Form.Group className="form-postal-code mb-3" >
            <Form.Label for="postalCode">Postal Code:</Form.Label>
            <Form.Control id="postalCode" placeholder="Postal Code" onChange={handlePostalcodeChange}/>
        </Form.Group>
        <Form.Group className="form-city mb-3" >
            <Form.Label for="city">City:</Form.Label>
            <Form.Control id="city" placeholder="City" onChange={handleCityChange}/>
        </Form.Group>
        <Form.Group className="form-state mb-3" >
            <Form.Label for="state">State/Region:</Form.Label>
            <Form.Control id="state" placeholder="State/Region" onChange={handleRegionChange}/>
        </Form.Group>
        <Form.Group className="form-country mb-3" >
            <Form.Label for="country">Country:</Form.Label>
            <Form.Control id="country" placeholder="Country" onChange={handleCountryChange}/>
        </Form.Group>
    </div>
  )
}
