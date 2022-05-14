import React, {useState, useEffect} from 'react'
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import SellFormContent from './SellFormContent';
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import { useNavigate } from "react-router-dom";
import edit_icon from '../image/edit_icon.png'
import "../styles/Profile.css";
import Loading from "./Loading";

export default function  ModalEditSneaker({id}) {
    const {isLoading} = useAuth0();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const reload=()=>window.location.reload();

    const { isAuthenticated } = useAuth0();

    const navigate = useNavigate();
    const { accessToken } = useAuthToken();

    function stillLoading(){
        return <div className="loading"><Loading /></div>;
      }

      useEffect(()=>{
        if (isLoading) {
          stillLoading()
        }
      }, [isLoading])

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

    async function updateSneaker(data){
        const requestOptions = {
            method: 'PUT',
            headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        
        await fetch('https://finalassignment-348804.ue.r.appspot.com/sneakers/' + id, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
        
        handleClose()
        reload()
    }

    function submitForm(){
        const locSize = location + " " + size
        const currPrice = currency + " " + price
        const quant = parseInt(quantity)
        const data = {
            name: name,
            brand: brand,
            type: type,
            size: locSize,
            price: currPrice,
            quantity: quant,
            condition: condition,
            image: image
        }
        updateSneaker(data)
    }

  return (
    <div className="datatable-edit">
        <img src={edit_icon} onClick={handleShow} className="edit_icon" alt="Yellow pencil edit details icon" role="button" tabindex="0"/>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Sneaker Information</Modal.Title>
            </Modal.Header>
                <Modal.Body>
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
                    handleImageChange = {handleImageChange}/>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} role="button" tabindex="0" aria-label="Close edit sneaker detail form button">
                    Close
                </Button>
                <Button variant="primary" onClick={submitForm} role="button" tabindex="0" aria-label="Submit edit sneaker detail form button">
                    Submit
                </Button>
            </Modal.Footer>
        </Modal> 
    </div>
  )
}
