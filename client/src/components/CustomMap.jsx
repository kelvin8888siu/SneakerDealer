import React, {useState} from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import "../styles/Contact.css"

function CustomMap({google, pickupLocation}) {
  const [lat, setLat] = useState()
  const [lng, setLng] = useState()

  async function geocode(pickupLocation){
    const apiKey = 'AIzaSyCdbzlgIaKBbcTnP0GMiMoEUzpMFYNkZHk';
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${pickupLocation}&key=${apiKey}`, {
      method: "GET",
    });
    const data = await res.json()
    setLat(data.results[0].geometry.location.lat) 
    setLng(data.results[0].geometry.location.lng)
  }

  geocode(pickupLocation)

  function handleClick(){
    console.log('clicked')
  }

  return (
      lat && lng && (
      <Map
      className = "location-map"
      google={google}
      style={{
        backgroundColor:"none"}}
      zoom={15}
      initialCenter={{
        lat: lat, //43.6496919
        lng: lng //-79.4004086
      }}
      >
          <Marker
              position={{lat: lat, lng:lng}} 
              onClick={handleClick}/>
          </Map>
      )
  )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCdbzlgIaKBbcTnP0GMiMoEUzpMFYNkZHk'
})(CustomMap);