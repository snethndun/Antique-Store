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
        Cookies.remove('user_name');
      }
    });
  }

  return (
    <MDBNavbar expand="lg" light style={{ backgroundColor: '#F8F9FA', borderBottom: '2px solid #D4A373' }}>
      <MDBContainer>
        {/* Navbar Brand */}
        <MDBNavbarBrand href="/admin/dashboard" className="fw-bold" style={{ color: '#8B4513', fontSize: '1.5rem' }}>
          The Antique Shop
        </MDBNavbarBrand>

        {/* Navbar Toggler */}
        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas style={{ color: '#8B4513' }} />
        </MDBNavbarToggler>

        {/* Collapse Section */}
        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            {/* Home */}
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/admin/dashboard" style={{ color: '#8B4513', fontSize: '1.1rem' }}>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            {/* Products */}
            <MDBNavbarItem>
              <MDBNavbarLink href="/admin/product" style={{ color: '#8B4513', fontSize: '1.1rem' }}>
                Products
              </MDBNavbarLink>
            </MDBNavbarItem>
            {/* Orders */}
            <MDBNavbarItem>
              <MDBNavbarLink href="/admin/order" style={{ color: '#8B4513', fontSize: '1.1rem' }}>
                Orders
              </MDBNavbarLink>
            </MDBNavbarItem>
            {/* Chats */}
            <MDBNavbarItem>
              <MDBNavbarLink href="/admin/chat" style={{ color: '#8B4513', fontSize: '1.1rem' }}>
                Chats
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          {/* Logout */}
          <div className="d-flex input-group w-auto">
            <MDBBtn color="dark" className="rounded shadow-0" style={{ backgroundColor: '#8B4513' }} onClick={logout}>
              Logout
            </MDBBtn>
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
