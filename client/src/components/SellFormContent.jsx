import React from 'react'
import {Form, Col, Row, FloatingLabel, Container} from 'react-bootstrap'
import AddressFormContent from './AddressFormContent'
import '../styles/SellForm.css'


export default function SellFormContent({handleNameChange, handleBrandChange, setLocation, setType, setSize, setCondition, handleQuantityChange, setCurrency, handlePriceChange, handleImageChange, handleAddress1Change, handleAddress2Change, handlePostalcodeChange, handleCityChange, handleRegionChange, handleCountryChange}) {
    const list = [];
    for (var i=2; i<17.5; i+=0.5) {
        list.push(<option key={i} value={i}>{i}</option>);
    }

  return (
        <Form className="sneaker-detail-form-container">
            <Form.Group className="sell-detail-form mb-3" >
                <Form.Label for="sneakerDetails">Sneaker Details:</Form.Label>
                <Container className="sell-form-sneaker-details border">
                    <Form.Group className="sneaker-name mb-3" >
                        <Form.Label for="sneakerName">Sneaker Name:</Form.Label>
                        <Form.Control id="sneakerName" placeholder="Shoe Name" onChange={handleNameChange}/>
                    </Form.Group>
                
                    <Form.Group className="sell-form-sneaker-brand mb-3">
                        <Form.Label for="sneakerBrand" >Sneaker Brand:</Form.Label>
                        <Form.Control id="sneakerBrand" placeholder="Shoe Brand" onChange={handleBrandChange}/>
                    </Form.Group>

                    <Form.Group className="sell-form-sneaker-size mb-3">
                        <Form.Label for="sneakerSize">Sneaker Size:</Form.Label>
                        <Row id="sneakerSize" className="g-3">
                            <Col md>
                                <FloatingLabel controlId="sneakerSizeCountryCode" label="Location">
                                    <Form.Select aria-label="Select shoe size country code" onChange={(e) => setLocation(e.target.value)}>
                                        <option value="US">US</option>
                                        <option value="UK">UK</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="sneakerSizeGenderAge" label="Type">
                                    <Form.Select aria-label="Select shoe size based on gender or age" onChange={(e) => setType(e.target.value)}>
                                        <option value="Td">Toddler</option>
                                        <option value="GS">Grade School / Kids</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="sneakerNumericSize" label="Size">
                                    <Form.Select aria-label="Select numeric shoe size number" onChange={(e) => setSize(e.target.value)}>
                                        {
                                            list.map((item) => {
                                                return item
                                            })
                                        }
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="sell-form-sneaker-condition mb-3">
                        <Form.Label for="condition">Condition:</Form.Label>
                        <Form.Select id="condition" aria-label="Select shoe condition" onChange={(e) => setCondition(e.target.value)}>
                            <option value="Pre-Owned / Used">Pre-Owned / Used</option>
                            <option value="New">New</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="sell-form-sneaker-quantity mb-3">
                        <Form.Label for="quantity">Quantity:</Form.Label>
                        <Form.Control id="quantity" placeholder="Quantity" onChange={handleQuantityChange}/>
                    </Form.Group>

                    <Form.Group className="sell-form-sneaker-price mb-3">
                        <Form.Label for="sneakerPrice">Sneaker Price:</Form.Label>
                        <Row id="sneakerPrice" className="g-2">
                            <Col md>
                                <Form.Select aria-label="Select currency" onChange={(e) => setCurrency(e.target.value)}>
                                    <option value="USD">USD</option>
                                    <option value="CAD">CAD</option>
                                </Form.Select>
                            </Col>
                            <Col md>
                                <Form.Control placeholder="Price" onChange={handlePriceChange}/>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="sell-form-sneaker-imageURL mb-3">
                        <Form.Label for="imageUrl">Image URL:</Form.Label>
                        <Form.Control id="imageUrl" placeholder="Image URL" onChange={handleImageChange}/>
                    </Form.Group>
                </Container>
            </Form.Group>

            <Form.Group className="sell-form-sneaker-pickup-location mb-3">
                <Form.Label for="pickUp">Pick-up Location:</Form.Label>
                <Container id="pickUp" className="address-container border">
                    <AddressFormContent
                        handleAddress1Change = {handleAddress1Change}
                        handleAddress2Change = {handleAddress2Change}
                        handlePostalcodeChange = {handlePostalcodeChange}
                        handleCityChange = {handleCityChange}
                        handleRegionChange = {handleRegionChange}
                        handleCountryChange = {handleCountryChange}/>
                </Container>
            </Form.Group>

        </Form>
  )
}
