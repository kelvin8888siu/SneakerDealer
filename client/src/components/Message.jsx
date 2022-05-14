import React from 'react'
import {Card} from "react-bootstrap";
import "../styles/Contact.css"

export default function Message({key, username, message}) {
  return (
    <Card key={key} className="message-row">
        <Card.Header>{username}</Card.Header>
        <Card.Body className="message-comment">
            <p>
                {message}
            </p>
        </Card.Body>
    </Card>
  )
}
