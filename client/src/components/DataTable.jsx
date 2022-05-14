import React, {useState} from 'react'
import Table from "react-bootstrap/Table"
import {Container, Button} from "react-bootstrap"
import ModalEditSneakers from "./ModalEditSneakers"
import ModalDeleteSneakers from "./ModalDeleteSneaker"
import check_icon from "../image/check_icon.png"
import minus from "../image/minus.png"
import add from "../image/add.png"
import "../styles/Profile.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";

export default function DataTable({lstSneaker, updateStatus, quantity}) {    
    const { isLoading } = useAuth0();
    const { accessToken } = useAuthToken();
    const [quant, setQuant] = useState(quantity);

    async function updateMinus(e){
        const sneakerId = e.target.id;
        const res = await fetch(`https://finalassignment-348804.ue.r.appspot.com/sneakers/${sneakerId}`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await res.json();
        const quantity = data.quantity - 1;
    
        const requestOptions = {
            method: 'PUT',
            headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({quantity: quantity})
          };
        
          const response = await fetch('https://finalassignment-348804.ue.r.appspot.com/sneakers/' + sneakerId, requestOptions)
          const finaldata = await response.json()
          setQuant({...quant, [sneakerId]: quant[sneakerId] - 1});
      }
    
      async function updateAdd(e){
        const sneakerId = e.target.id;
        const res = await fetch(`https://finalassignment-348804.ue.r.appspot.com/sneakers/${sneakerId}`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await res.json();
        const quantity = data.quantity + 1;
    
        const requestOptions = {
            method: 'PUT',
            headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({quantity: quantity})
          };
        
          const response = await fetch('https://finalassignment-348804.ue.r.appspot.com/sneakers/' + sneakerId, requestOptions)
          const finaldata = await response.json()
          setQuant({...quant, [sneakerId]: quant[sneakerId] + 1});
      }

  return (
    <Container className="datatable">
        <Table responsive hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Condition</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {lstSneaker.map((item) => {
                    return (
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.brand}</td>
                        <td>{item.type}</td>
                        <td>{item.size}</td>
                        <td>{item.price}</td>
                        <td>
                            <div className="quantity-buttons">
                                <img src={minus} variant="success" id={item.id} onClick={updateMinus} className="minus" role="button" tabindex="0" aria-label="Subtract from the quantity button"/>
                                    {quant[item.id]}
                                <img src={add} variant="success" id={item.id} onClick={updateAdd} className="add" role="button" tabindex="0" aria-label="Add to the quantity button"/>
                            </div>
                        </td>
                        <td>{item.condition}</td>
                        <td>
                            <div style={{width:"110px"}} className="datatable-actions">
                                <ModalEditSneakers id={item.id}/>
                                <ModalDeleteSneakers id={item.id}/>
                                <img src={check_icon} variant="success" id={item.id} onClick={updateStatus} className="check_icon" alt="Green check icon image" role="button" tabindex="0"/>
                            </div>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
         </Table>
    </Container>
  )
}
