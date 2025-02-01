import React, { useState } from 'react';
import {
  MDBBtn
} from 'mdb-react-ui-kit';
import axios, { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

interface LoginData {
  [x: string]: any;
  email: string;
  password: string;
  isAdmin?: boolean; 
}

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    const loginData: LoginData = {
      email: email,
      password: password
    };

    axios.post('http://localhost:5000/users/login', loginData)
      .then((response: AxiosResponse<LoginData>) => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login successful!',
        }).then(() => {
          Cookies.set('user_name', email, { expires: 7 });

          if ((response.data.role) === "customer") {
            window.location.href = "/customer/dashboard";
          } else {
            window.location.href = "/admin/dashboard";
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Login failed. Invalid email or password.',
        });
        console.error('Login failed:', error);
      });
  };

  const registration_action = (): void => {
    window.location.href = '../Registration';
  };

  return (
    <div style={{ backgroundColor: '#ffff', fontFamily: 'Garamond, serif', minHeight: '100vh' }}>
      <div className='container' style={{ padding: '5% 0' }}>
        <div className='row align-items-center'>
          <div className='col-md-8'>
            <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
              <h1 style={{ color: '#6b4f4f', fontSize: '3rem', marginBottom: '20px' }}>Welcome to Antique Store</h1>
              <h2 style={{ color: '#6b4f4f', fontSize: '1.5rem', marginBottom: '20px' }}>Discover the elegance of timeless treasures</h2>
            
               <img 
                src='../img\sign_in.png' 
                alt='Antique Store' 
                style={{ width: '90%', borderRadius: '8px' }}
              />
            </div>

          </div>
          <div className='col-md-4'>
            <div className='card' style={{ backgroundColor: '#fffaf0', border: '1px solid #d4af37', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <div className='card-body'>
                <h3 className='text-center text-uppercase' style={{ color: '#6b4f4f', textDecoration: 'underline', marginBottom: '20px' }}>Sign In</h3>
                <div className='mb-3'>
                  <label htmlFor='email' style={{ fontWeight: 'bold', color: '#6b4f4f' }}>Email :</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ border: '1px solid #d4af37' }}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' style={{ fontWeight: 'bold', color: '#6b4f4f' }}>Password :</label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ border: '1px solid #d4af37' }}
                  />
                </div>
                <div className='text-center'>
                  <div className="d-grid gap-2 col-12 mx-auto">
                    <MDBBtn 
                      type='submit' 
                      className='btn shadow-0' 
                      onClick={handleLogin} 
                      style={{ backgroundColor: '#d4af37', color: '#fff', fontWeight: 'bold', borderRadius: '5px' }}>
                      Login
                    </MDBBtn>
                  </div>
                </div>
                <hr style={{ marginTop: '10%', borderColor: '#d4af37' }} />
                <center>
                  <h6 
                    className='text-uppercase' 
                    style={{ cursor: 'pointer', color: '#6b4f4f', textDecoration: 'underline' }} 
                    onClick={registration_action}>
                    I Do Not Have Account
                  </h6>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
