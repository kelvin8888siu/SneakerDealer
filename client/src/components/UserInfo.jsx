import React from 'react'
import user from "../image/user.png"
import mail from "../image/mail.png"
import home from "../image/home.png"
import phoneimg from "../image/phone.png"
import "../styles/Profile.css";

export default function UserInfo({name, email, address, username, phone, contactSeller}) {
  return (
    <div className="user-info">
        <div className="user-info-name">
          <img src={user} variant="success" className="user-img" alt="Profile avatar icon image"/>
          <p className="name">{name}</p>
        </div>
        <div className="user-info-mail">
          <img src={mail} variant="success" className="mail-img" alt="Mail icon image"/>
          <p className="email">{email}</p>
        </div>
        {!contactSeller &&
        <div className="user-info-home">
          <img src={home} variant="success" className="home-img" alt="House icon image"/>
          <p className="address">{address}</p>
        </div>
        }
        <div className="user-info-phone">
          <img src={phoneimg} variant="success" className="phone-img" alt="Phone icon image"/>
          <p className="phone">{phone}</p>
        </div>
    </div>
  )
}
