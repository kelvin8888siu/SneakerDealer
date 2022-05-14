import React, {useState} from 'react'
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import delete_icon from "../image/delete_icon.png"
import "../styles/Profile.css";

export default function ModalDeleteSneaker({id}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const reload = ()=>window.location.reload();
    
    async function deleteRow(){
        await fetch('https://finalassignment-348804.ue.r.appspot.com/sneakers/' + id, {
        method: 'DELETE',
        })
        .then(res => res.json)
        .then(data => console.log(data))
        reload()
    }

  return (
    <div className="datatable-delete">
        <img src={delete_icon} onClick={handleShow} className="delete_icon" alt="Red garbage bin delete sneaker detail icon" role="button" tabindex="0"/>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Sneaker Record</Modal.Title>
            </Modal.Header>
                <Modal.Body>Are you sure you want to delete these Records?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} role="button" tabindex="0" aria-label="Close delete sneaker detail form button">
                    Close
                </Button>
                <Button variant="danger" onClick={deleteRow} role="button" tabindex="0" aria-label="Delete sneaker detail form button">
                    Delete
                </Button>
            </Modal.Footer>
        </Modal> 
    </div>   
  )
}
