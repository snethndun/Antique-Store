import React, { useState, useEffect } from 'react';
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './Nav';

interface Order {
    _id: string;
    orderNumber: string;
    buyerId: string;
    productId: {
      _id: string;
      productName: string;
      productPrice: string;
    };
    quantity: number;
    status: string;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
}


function Orders(): JSX.Element {
  
    const [orders, setOrders] = useState<Order[]>([]);
    function fetchPendingOrders(): Promise<Order[]> {
        return axios
          .get<{ orders: Order[] }>(`http://localhost:5000/orders/allOrders`)
          .then(response => response.data.orders)
          .catch(error => {
            console.error('Error fetching pending orders:', error);
            return [];
          });
    }

    function calculateTotalPrice(orders: Order[]): number {
        let totalPrice = 0;
      
        orders.forEach(order => {
          totalPrice += order.quantity * parseFloat(order.productId.productPrice);
        });
      
        return totalPrice;
    }

      
    useEffect(() => {
        
        fetchPendingOrders()
        .then(orders => {
            setOrders(orders);
        });
        
    }, []); 
    
    function back(){
        window.location.href="/admin/dashboard";
    }
    function order_Status(orderId: string): void {
        Swal.fire({
            title: 'Select Action',
            input: 'select',
            inputOptions: {
              complete: 'Complete Order',
              cancel: 'Cancel Order',
            },
            inputPlaceholder: 'Select an action',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: (action) => {
              if (!action) {
                Swal.showValidationMessage('Please select an action');
              } else {
                return axios.put(`http://localhost:5000/orders/completeOrCancelOrder/${orderId}`, { action })
                  .then((response) => {
                    return response.data.message;
                  })
                  .catch((error) => {
                    throw new Error(error.response.data.message || 'Failed to update order');
                  });
              }
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Success', result.value, 'success');
              // Refresh or update your UI if needed
            }
        });
    }

  return (
    <>
    <NavBar/>
      <div style={{ backgroundColor: '#E2E7E9' }}>
        <main style={{ paddingTop: '58px', backgroundColor: '#D7DDDC' }}>
          <div className='container pt-5 pb-5'>
            <div className='container'>
                <h4 className='text-uppercase ' style={{color:'black'}}>Admin Dashboard</h4>
                <p style={{fontSize:'18px' , lineHeight:'20px'}}>Order Managing</p>
                <hr/>
                <div className='text-end'>
                    <button className='btn btn-outline-dark' onClick={back}>Back</button>&nbsp;
                </div>
           
                <MDBTable className='mt-4'>
                        <MDBTableHead dark>
                            <tr>
                                <th className='text-white text-center'>Order Number</th>
                                <th className='text-white text-center'>Customer's Email</th>
                                <th className='text-white text-center'>Product Name</th>
                                <th className='text-white text-center'>Quantity</th>
                                <th className='text-white text-center'>Total Price</th>
                                <th className='text-white text-center'>Status</th>
                                <th className='text-white text-center'>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody className='bg-white'>
                            {orders.map(order => (
                                <tr key={order?._id}>
                                    <td>{order?.orderNumber}</td>
                                    <td>{order?.buyerId}</td>
                                    <td>{order?.productId?.productName}</td>
                                    <td className='text-center'>{order?.quantity}</td>
                                    <td className='text-center'>USD. {(parseInt(order?.productId?.productPrice) * order?.quantity).toFixed(2)}</td>
                                    <td className='text-center'>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</td>
                                    <td className='text-center'>
                                        {order.status === 'Order Placed' && (
                                            <button className='btn btn-dark btn-sm shadow-0' onClick={()=>order_Status(order._id)}>Order Status</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                </MDBTable>
                </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Orders;
