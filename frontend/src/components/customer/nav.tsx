import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

export default function App() {
  const [openBasic, setOpenBasic] = useState(false);

  function cart() {
    window.location.href = "../customer/Cart";
  }

  function chat() {
    window.location.href = "../customer/ChatBot";
  }

  function logout(): void {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/';
        Cookies.remove("user_name");
      }
    });
  }

  return (
    <MDBNavbar expand='lg' light style={{ backgroundColor: '#F9F5E7', borderBottom: '2px solid #D4A373' }}>
      <MDBContainer>
        <MDBNavbarBrand href='/customer/dashboard' className='fw-bold' style={{ color: '#8B4513', fontSize: '1.5rem' }}>
          The Antique Shop
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas style={{ color: '#8B4513' }} />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='#' style={{ color: '#8B4513', fontSize: '1.1rem' }} 
              onClick={() => window.location.href = "/customer/dashboard"}>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#' style={{ color: '#8B4513', fontSize: '1.1rem' }}>
                Terms & Conditions
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <div className='d-flex align-items-center'>
            <h6
              className='me-4 mb-0'
              style={{ color: '#8B4513', cursor: 'pointer', fontSize: '1rem' }}
              onClick={chat}
            >
              Chat
            </h6>
            <h6
              className='me-4 mb-0'
              style={{ color: '#8B4513', cursor: 'pointer', fontSize: '1rem' }}
              onClick={cart}
            >
              Cart
            </h6>
            <MDBBtn color='dark' className='rounded shadow-0' style={{ backgroundColor: '#8B4513' }} onClick={logout}>
              Logout
            </MDBBtn>
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
