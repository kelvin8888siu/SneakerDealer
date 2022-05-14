import React from 'react'
import { Table } from 'react-bootstrap'

export default function Transactions({sneakersSold}) {
  return (
    <Table>
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
          </tr>
      </thead>
      <tbody>
        {sneakersSold.map((item)=>{
          return (
            <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.name}</td>
            <td>{item.brand}</td>
            <td>{item.type}</td>
            <td>{item.size}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.condition}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
