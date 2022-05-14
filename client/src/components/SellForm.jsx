import NavigationBar from './NavigationBar';
import { useAuth0 } from "@auth0/auth0-react";
import SellFormContent from './SellFormContent';
import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container"
import { useAuthToken } from "../AuthTokenContext";
import { useNavigate } from "react-router-dom";
import '../styles/SellForm.css'


export default function SellForm() {
    const { isAuthenticated } = useAuth0();

    const navigate = useNavigate();
    const { accessToken } = useAuthToken();

    const [name, setName] = useState('')
    function handleNameChange(e){
        setName(e.target.value)
    }

    const [brand, setBrand] = useState('')
    function handleBrandChange(e){
        setBrand(e.target.value)
    }

    const [location, setLocation] = useState("US")
    const [type, setType] = useState("Toddler")
    const [size, setSize] = useState("2")
    const [condition, setCondition] = useState("Pre-Owned / Used")

    const [quantity, setQuantity] = useState('')
    function handleQuantityChange(e){
        setQuantity(e.target.value)
    }

    const [currency, setCurrency] = useState("USD")
    
    const [price, setPrice] = useState('')
    function handlePriceChange(e){
        setPrice(e.target.value)
    }

    const [image, setImage] = useState('')
    function handleImageChange(e){
        setImage(e.target.value)
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

    async function submitSneaker(data){
        await fetch('https://finalassignment-348804.ue.r.appspot.com/sneakers', {
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
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    function submitForm(){
        const locSize = location + " " + size
        const currPrice = currency + " " + price
        const quant = parseInt(quantity)
        const pickuplocation = address1 + " " + address2 + " " + city + " " + region + " " + postalCode + " " + country
        const data = {
            name: name,
            brand: brand,
            type: type,
            size: locSize,
            price: currPrice,
            quantity: quant,
            condition: condition,
            image: image,
            location: pickuplocation
        }
        submitSneaker(data)
        navigate("/app")
    }
    

  return (
    isAuthenticated && (
    <div className="sell-form">
        <NavigationBar/>
        <br></br>
        <Container className="sell-form-container" fluid="sm">
          <SellFormContent 
            handleNameChange = {handleNameChange}
            handleBrandChange = {handleBrandChange}
            setLocation = {setLocation}
            setType = {setType}
            setSize = {setSize}
            setCondition = {setCondition}
            handleQuantityChange = {handleQuantityChange }
            setCurrency = {setCurrency}
            handlePriceChange = {handlePriceChange}
            handleImageChange = {handleImageChange}
            handleAddress1Change = {handleAddress1Change}
            handleAddress2Change = {handleAddress2Change}
            handlePostalcodeChange = {handlePostalcodeChange}
            handleCityChange = {handleCityChange}
            handleRegionChange = {handleRegionChange}
            handleCountryChange = {handleCountryChange}/>
          <Button variant="primary" type="submit" onClick={submitForm} role="button" tabindex="0" aria-label="Button for submitting form to sell sneaker">
                Submit
          </Button>
        </Container>
        <br></br>
    </div>
    )
  )
}
