import React, { useState, useEffect } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
} from 'mdb-react-ui-kit';

import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Navbar from './nav';
import PayPalComponent from './paypal';

interface Order {
  _id: string;
  orderNumber: string;
  productId: {
    _id: string;
    productName: string;
    productPrice: string;
  };
  quantity: number;
  buyerId: string;
  status: string;
  paymentStatus: string;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

function Cart(): JSX.Element {
  const initialUsername: string | undefined = Cookies.get('user_name');
  const [username, setUsername] = useState<string | undefined>(initialUsername);

  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);

  // Fetch pending orders for the logged-in user
  function fetchPendingOrders(username: string | undefined): Promise<Order[]> {
    return axios
      .get<{ pendingOrders: Order[] }>(`http://localhost:5000/orders/oneUserPendingOrders/${username}`)
      .then((response) => response.data.pendingOrders)
      .catch((error) => {
        console.error('Error fetching pending orders:', error);
        return [];
      });
  }

  // Calculate the total price of all orders
  function calculateTotalPrice(orders: Order[]): number {
    let totalPrice = 0;
    orders.forEach((order) => {
      totalPrice += order.quantity * parseFloat(order.productId.productPrice);
    });
    return totalPrice;
  }

  useEffect(() => {
    if (username) {
      fetchPendingOrders(username).then((orders) => {
        setPendingOrders(orders);
      });
    }
  }, [username]);

  // Handle the deletion of an item from the cart
  function idemDelete(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(id);
      }
    });
  }

  // Perform the actual item deletion
  function deleteItem(id: string): void {
    axios
      .delete(`http://localhost:5000/orders/deleteOrder/${id}`)
      .then(() => {
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success').then(() => {
          fetchPendingOrders(username).then((orders) => {
            setPendingOrders(orders);
          });
        });
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        Swal.fire('Error!', 'There was an error deleting the item.', 'error');
      });
  }

  // Handle the quantity change for each item
  function handleQuantityChange(orderId: string, newQuantity: number): void {
    if (newQuantity < 1) return;
    axios
      .put(`http://localhost:5000/orders/updateQuantity/${orderId}`, { quantity: newQuantity })
      .then(() => {
        fetchPendingOrders(username).then((orders) => {
          setPendingOrders(orders);
        });
      })
      .catch((error) => {
        console.error('Error updating quantity:', error);
        Swal.fire('Error!', 'There was an error updating the quantity.', 'error');
      });
  }

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#F9F5E7', paddingBottom: '6%' }}>
        <div className='text-center mb-4 pt-5'>
          <h1 className='text-decoration-underline' style={{ color: '#8B4513' }}>
            Your Cart
          </h1>
        </div>
        <div className='container'>
          <MDBRow className='row'>
            <MDBCol className='col-8'>
              <div className='card shadow-0'>
                <div
                  className='card-body border rounded'
                  style={{ backgroundColor: '#FFF8E1', borderColor: '#D4A373' }}
                >
                  <MDBTable>
                    <MDBTableHead style={{ backgroundColor: '#D4A373' }}>
                      <tr>
                        <th className='text-white text-center'>Order Number</th>
                        <th className='text-white text-center'>Product Name</th>
                        <th className='text-white text-center'>Quantity</th>
                        <th className='text-white text-center'>Total Price</th>
                        <th className='text-white text-center'>Action</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {pendingOrders.map((order) => (
                        <tr key={order._id}>
                          <td className='text-center'>{order._id}</td>
                          <td className='text-center'>{order.productId.productName}</td>
                          <td className='text-center'>
                            <MDBInput
                              type='number'
                              value={order.quantity}
                              min='1'
                              onChange={(e) =>
                                handleQuantityChange(order._id, parseInt(e.target.value))
                              }
                              size="sm"
                            />
                          </td>
                          <td className='text-center'>
                            USD. {parseFloat(order.productId.productPrice) * order.quantity}
                          </td>
                          <td className='text-center'>
                            <MDBBtn
                              className='btn btn-danger btn-sm shadow-0'
                              onClick={() => idemDelete(order._id)}
                            >
                              Delete
                            </MDBBtn>
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </div>
            </MDBCol>
            <MDBCol className='col-4'>
              <div className='card shadow-0'>
                <div
                  className='card-body border rounded'
                  style={{
                    backgroundColor: '#FFF8E1',
                    borderColor: '#D4A373',
                  }}
                >
                  <div className='text-center'>
                    <h4 style={{ color: '#8B4513' }}>Total Payment</h4>
                    <hr />
                    <br />
                    <h1 className='display-1' style={{ color: '#8B4513' }}>
                      {calculateTotalPrice(pendingOrders)}
                    </h1>
                    <h4 style={{ color: '#8B4513' }}>USD</h4>
                    <div className='container mt-3'>
                      <PayPalComponent />
                    </div>
                    <MDBBtn
                      color="primary"
                      className="mt-4 w-100"
                      onClick={() => Swal.fire('Proceeding to Checkout')}
                    >
                      Checkout
                    </MDBBtn>
                  </div>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
    </>
  );
}

export default Cart;
