import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import NavBar from './Nav';

function AdminDash() {
  function productAction() {
    window.location.href = '../admin/product';
  }

  function orderAction() {
    window.location.href = '../admin/order';
  }

  function chatAction() {
    window.location.href = '../admin/chat';
  }

  return (
    <>
      <NavBar />
      <div style={{ backgroundColor: '#f5f5dc', minHeight: '100vh' }}>
        <div className="container pt-5">
          {/* Dashboard Header */}
          <div className="row mb-4">
            <div className="col-md-8">
              <h1 className="text-dark" style={{ fontFamily: 'Cinzel, serif' }}>
                Admin Dashboard
              </h1>
              <p className="text-muted" style={{ fontFamily: 'Cormorant, serif' }}>
                Manage your antique shop operations with timeless precision
              </p>
            </div>
            <div className="col-md-4 text-center">
              <img
                src="../img/Admin-cuate.png"
                alt="Admin Dashboard"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Dashboard Widgets */}
          <MDBRow>
            <MDBCol sm="4" className="mb-4">
              <MDBCard className="h-100 text-center shadow-sm hover-effect" style={{ backgroundColor: '#ffe4c4' }}>
                <MDBCardBody>
                  <div>
                    <i
                      className="fas fa-cube text-dark mb-3"
                      style={{ fontSize: '2.5rem' }}
                    ></i>
                  </div>
                  <h4>Total Products</h4>
                  <p className="text-muted">120</p>
                  <button
                    className="btn btn-dark btn-sm"
                    onClick={productAction}
                  >
                    View Products
                  </button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol sm="4" className="mb-4">
              <MDBCard className="h-100 text-center shadow-sm hover-effect" style={{ backgroundColor: '#ffe4c4' }}>
                <MDBCardBody>
                  <div>
                    <i
                      className="fas fa-receipt text-dark mb-3"
                      style={{ fontSize: '2.5rem' }}
                    ></i>
                  </div>
                  <h4>Pending Orders</h4>
                  <p className="text-muted">45</p>
                  <button
                    className="btn btn-dark btn-sm"
                    onClick={orderAction}
                  >
                    Manage Orders
                  </button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol sm="4" className="mb-4">
              <MDBCard className="h-100 text-center shadow-sm hover-effect" style={{ backgroundColor: '#ffe4c4' }}>
                <MDBCardBody>
                  <div>
                    <i
                      className="fas fa-comments text-dark mb-3"
                      style={{ fontSize: '2.5rem' }}
                    ></i>
                  </div>
                  <h4>Unread Messages</h4>
                  <p className="text-muted">32</p>
                  <button
                    className="btn btn-dark btn-sm"
                    onClick={chatAction}
                  >
                    View Chats
                  </button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>

          {/* Additional Widgets */}
          <MDBRow>
            <MDBCol sm="6" className="mb-4">
              <MDBCard className="h-100 text-center shadow-sm hover-effect" style={{ backgroundColor: '#ffe4c4' }}>
                <MDBCardBody>
                  <div>
                    <i
                      className="fas fa-chart-line text-dark mb-3"
                      style={{ fontSize: '2.5rem' }}
                    ></i>
                  </div>
                  <h4>Sales Performance</h4>
                  <p className="text-muted">Up 20% from last month</p>
                  <button className="btn btn-dark btn-sm">View Reports</button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol sm="6" className="mb-4">
              <MDBCard className="h-100 text-center shadow-sm hover-effect" style={{ backgroundColor: '#ffe4c4' }}>
                <MDBCardBody>
                  <div>
                    <i
                      className="fas fa-user-friends text-dark mb-3"
                      style={{ fontSize: '2.5rem' }}
                    ></i>
                  </div>
                  <h4>New Users</h4>
                  <p className="text-muted">15 sign-ups today</p>
                  <button className="btn btn-dark btn-sm">Manage Users</button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>

        {/* Footer Section */}
        <footer className="py-4 text-dark text-center mt-5" style={{ backgroundColor: '#deb887' }}>
          <p style={{ fontFamily: 'Cormorant, serif' }}>
            &copy; {new Date().getFullYear()} Quantique Antique Shop. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

export default AdminDash;
