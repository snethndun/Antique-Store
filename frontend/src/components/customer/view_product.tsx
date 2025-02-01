import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBCardFooter,
  MDBBtn,
} from 'mdb-react-ui-kit';

import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Navbar from './nav';

interface ProductData {
  _id: string;
  productName: string;
  productPrice: string;
  productQuantity: string;
  productCondition: string;
  productImage: string;
  status: string;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

function CusDash(): JSX.Element {
  const initialUsername: string | undefined = Cookies.get('user_name');
  const [username, setUsername] = useState<string | undefined>(initialUsername);

  const [quantity, setQuantity] = useState<number | string>('');

  const [productData, setProductData] = useState<ProductData>({
    _id: '',
    productName: '',
    productPrice: '',
    productQuantity: '',
    productCondition: '',
    productImage: '',
    status: '',
    timestamps: { createdAt: new Date(), updatedAt: new Date() },
  });

  useEffect(() => {
    const paramsFromURL = getParamsFromURL();
    setProductData(paramsFromURL);
  }, []);

  function getParamsFromURL(): ProductData {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params: ProductData = {
      _id: urlSearchParams.get('_id') || '',
      productName: urlSearchParams.get('productName') || '',
      productPrice: urlSearchParams.get('productPrice') || '',
      productQuantity: urlSearchParams.get('productQuantity') || '',
      productCondition: urlSearchParams.get('productCondition') || '',
      productImage: urlSearchParams.get('productImage') || '',
      status: urlSearchParams.get('status') || '',
      timestamps: {
        createdAt: new Date(urlSearchParams.get('timestamps.createdAt') || ''),
        updatedAt: new Date(urlSearchParams.get('timestamps.updatedAt') || ''),
      },
    };

    return params;
  }

  function add_cart(_id: string): void {
    axios
      .post(`http://localhost:5000/orders/buy_product/${_id}/${username}`, {
        quantity: quantity,
      })
      .then((response) => {
        // Handle success
        console.log('Product added to cart successfully');
        setQuantity('');
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  }

  function addToCartConfirmation(_id: string): void {
    Swal.fire({
      title: 'Add to Cart?',
      text: 'Do you want to add this item to your cart?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, add to cart',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        add_cart(_id);
        Swal.fire('Added!', 'Product has been added to your cart.', 'success');
      } else {
        Swal.fire('Cancelled', 'Product was not added to your cart.', 'error');
      }
    });
  }

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#ffff', paddingBottom: '10%' }}>
        <div className="container">
          <div style={{ paddingTop: '6%' }}>
            <div className="text-center mb-4">
              <svg width="100%" height="240" className="rounded">
                <image href={'../img/product_view.jpg'} width="100%" />
              </svg>
            </div>
          </div>
          <hr />
          <MDBRow>
            <MDBCol className="col-5">
              <MDBCard className="bg-white  h-100">
                <MDBCardBody className="p-4">
                  <img
                    src={productData.productImage}
                    className="mb-3"
                    alt="Product"
                    width="100%"
                  />
                  <hr />
                  <MDBRow className="mt-4">
                    <MDBCol className="col-8">
                      <input
                        type="number"
                        placeholder="Type Quantity"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol className="col-4">
                      <MDBBtn
                        color="dark"
                        onClick={() => addToCartConfirmation(productData._id)}
                        disabled={
                          parseInt(productData.productQuantity) === 0
                            ? true
                            : false
                        }
                      >
                        Add To Cart
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                  <small className="text-danger">
                    {parseInt(productData.productQuantity) === 0
                      ? 'Product is currently unavailable'
                      : ''}
                  </small>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol className="col-7">
              <MDBCard className="bg-white p-4  h-100">
                <MDBCardTitle>{productData.productName}</MDBCardTitle>
                <hr />
                <span className="mt-2">
                  <b>Price </b>: LKR. {productData.productPrice}
                </span>
                <span className="mt-2">
                  <b>Quantity </b>: {productData.productQuantity}
                </span>
                <span className="mt-2">
                  <b>Condition </b>: {productData.productCondition}
                </span>
                <span className="mt-2">
                  <b>Status </b>:{' '}
                  <span
                    style={{
                      color:
                        productData.status.toLowerCase() === 'available'
                          ? 'green'
                          : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {productData.status}
                  </span>
                </span>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
    </>
  );
}

export default CusDash;
