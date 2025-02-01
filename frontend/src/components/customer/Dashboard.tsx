import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBCardFooter,
} from 'mdb-react-ui-kit';

import axios from 'axios';
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
  const [allProducts, setAllProducts] = useState<ProductData[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<ProductData[]>([]);

  const fetchProductData = async () => {
    try {
      const response = await axios.get<ProductData[]>('http://localhost:5000/products/allProducts');
      setAllProducts(response.data);
      // Simulate trending products by selecting the first 5 products
      setTrendingProducts(response.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  function view_product(phone: ProductData): void {
    const queryParams = new URLSearchParams();

    for (const key in phone) {
      if (phone.hasOwnProperty(key)) {
        const value = phone[key as keyof ProductData];

        if (key === 'timestamps') {
          // Handle the timestamps object separately
        } else {
          queryParams.append(key, String(value));
        }
      }
    }

    const url = `../customer/viewProduct?${queryParams.toString()}`;
    window.location.href = url;
  }

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#ffff', paddingBottom: '6%' }}>
        {/* Hero Section */}
        <div
          className="hero-section"
          style={{
            backgroundImage: "url('../img/antique_hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff',
            padding: '50px 0',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Welcome to the Antique Store
          </h1>
          <p style={{ fontSize: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
            Discover timeless treasures and unique collectibles. Add a touch of history to your collection today.
          </p>
        </div>

        {/* Trending Products Section */}
        <div className="container py-5">
          <h2 className="text-center mb-4">Trending Products</h2>
          <MDBRow className="row">
            {trendingProducts.map((product) => (
              <MDBCol key={product._id} className="col-3 mb-3">
                <MDBCard>
                  <MDBCardBody>
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <h5 className="mt-3">{product.productName}</h5>
                    <p>Price: Rs. {product.productPrice}</p>
                  </MDBCardBody>
                  <MDBCardFooter>
                    <button
                      className="btn btn-dark btn-block"
                      onClick={() => view_product(product)}
                    >
                      View Item
                    </button>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </div>

        {/* Promotional Section */}
        <div
          className="promo-section text-center text-white py-5"
          style={{
            backgroundImage: "url('../img/promo_banner.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2 className="mb-3">Limited Time Offer</h2>
          <p>Get up to 50% off on selected antiques. Don’t miss out!</p>
          <button className="btn btn-light">Shop Now</button>
        </div>

        {/* Explore Our Collection */}
        <div className="text-center mb-4 pt-5">
          <h1 className="text-decoration-underline">Explore Our Collection</h1>
        </div>

        <div className="container">
          <MDBRow className="row">
            <MDBCol className="col-12">
              <div className="card shadow-0">
                <div className="card-body border rounded" style={{ backgroundColor: '#FFFFFF' }}>
                  <MDBRow className="row">
                    {allProducts.map((phone) => (
                      <MDBCol key={phone._id} className="col-3 mb-3">
                        <MDBCard className="card shadow-0 border">
                          <MDBCardBody className="card-body">
                            <div className="text-center">
                              <svg width="100" height="100">
                                <image href={phone.productImage} width="100%" height="100%" />
                              </svg>
                            </div>
                            <h5 className="card-title mt-4">{phone.productName}</h5>
                            <span className="card-text">Price: Rs. {phone.productPrice}</span>
                            <br />
                            <span className="card-text">Condition: {phone.productCondition}</span>
                            <br />
                            <span className="card-text">
                              Status:{' '}
                              <span
                                style={{
                                  color:
                                    phone.status.toLowerCase() === 'available'
                                      ? 'green'
                                      : 'red',
                                }}
                              >
                                {phone.status}
                              </span>
                            </span>
                          </MDBCardBody>
                          <MDBCardFooter className="m-0 p-0">
                            <button
                              className="btn btn-dark btn-block"
                              style={{ letterSpacing: '2px' }}
                              onClick={() => view_product(phone)}
                            >
                              View Item
                            </button>
                          </MDBCardFooter>
                        </MDBCard>
                      </MDBCol>
                    ))}
                  </MDBRow>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </div>

        {/* Newsletter Signup Section */}
        <div className="newsletter-section py-5 bg-light text-center">
          <h2 className="mb-3">Stay Updated</h2>
          <p>Subscribe to our newsletter to receive updates on new arrivals and exclusive offers.</p>
          <input
            type="email"
            className="form-control w-50 mx-auto mb-3"
            placeholder="Enter your email"
          />
          <button className="btn btn-dark">Subscribe</button>
        </div>

        {/* Footer Section */}
        <footer className="py-4 bg-dark text-white text-center">
          <p>&copy; {new Date().getFullYear()} Antique Store. All rights reserved.</p>
          <p>
            <a href="#!" className="text-white mx-2">
              Privacy Policy
            </a>
            |
            <a href="#!" className="text-white mx-2">
              Terms of Service
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}

export default CusDash;
