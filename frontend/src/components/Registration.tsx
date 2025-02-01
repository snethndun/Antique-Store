import React, { useState, ChangeEvent } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';

interface RegData {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  password: string;
  role: string;
  mostLikePhoneBrand: string;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

const phoneBrands: string[] = ['iPhone', 'Nokia', 'HTC'];

function Registration(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [emailValidation, setEmailValidation] = useState<string>('');
  const [emailValidationColor, setEmailValidationColor] = useState<string>('');
  const [telephoneValidation, setTelephoneValidation] = useState<string>('');
  const [telephoneValidationColor, setTelephoneValidationColor] = useState<string>('');
  const [passwordValidation, setPasswordValidation] = useState<string>('');
  const [passwordValidationColor, setPasswordValidationColor] = useState<string>('');
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState<string>('');
  const [confirmPasswordValidationColor, setConfirmPasswordValidationColor] = useState<string>('');

  const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateTelephone = (telephone: string): boolean => /^[0-9]{10}$/.test(telephone);

  const validatePassword = (password: string): boolean =>
    /^(?=.*\d).{8,}$/.test(password);

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    if (!validateEmail(inputEmail)) {
      setEmailValidation('Invalid email format.');
      setEmailValidationColor('red');
    } else {
      setEmailValidation('Valid email.');
      setEmailValidationColor('green');
    }
  };

  const handleTelephoneInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputTelephone = e.target.value;
    setTelephone(inputTelephone);
    if (!validateTelephone(inputTelephone)) {
      setTelephoneValidation('Invalid phone number.');
      setTelephoneValidationColor('red');
    } else {
      setTelephoneValidation('Valid phone number.');
      setTelephoneValidationColor('green');
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    if (!validatePassword(inputPassword)) {
      setPasswordValidation('Password must be at least 8 characters and include a number.');
      setPasswordValidationColor('red');
    } else {
      setPasswordValidation('Strong password.');
      setPasswordValidationColor('green');
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputConfirmPassword = e.target.value;
    setConfirmPassword(inputConfirmPassword);
    if (inputConfirmPassword !== password) {
      setConfirmPasswordValidation('Passwords do not match.');
      setConfirmPasswordValidationColor('red');
    } else {
      setConfirmPasswordValidation('Passwords match.');
      setConfirmPasswordValidationColor('green');
    }
  };

  const handleRegistration = async (): Promise<void> => {
    try {
      const registrationData: RegData = {
        name,
        email,
        address,
        phoneNumber: telephone,
        password,
        role: 'customer',
        mostLikePhoneBrand: selectedBrand,
        timestamps: {
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      await axios.post('http://localhost:5000/customers/register', registrationData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Registration successful!',
      }).then(() => {
        window.location.href = '../';
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Registration failed. Please try again.',
      });
      console.error('Registration error:', error);
    }
  };

  const loginAction = (): void => {
    window.location.href = '../';
  };

  return (
    <div style={{ backgroundColor: '#ffff', fontFamily: 'Garamond, serif', minHeight: '100vh' }}>
      <div className='container' style={{ padding: '5% 0' }}>
        <div className='row align-items-center'>
          <div className='col-md-8'>
            <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
              <h1 style={{ color: '#6b4f4f', fontSize: '3rem', marginBottom: '20px' }}>Join the Antique Store</h1>
              <h2 style={{ color: '#6b4f4f', fontSize: '1.5rem', marginBottom: '20px' }}>Preserve timeless treasures with us</h2>
              <img src='../img/sign_in.png' alt='Antique Store' style={{ width: '90%', borderRadius: '8px' }} />
            </div>
          </div>
          <div className='col-md-4'>
            <div
              className='card'
              style={{
                backgroundColor: '#fffaf0',
                border: '1px solid #d4af37',
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className='card-body'>
                <h3 className='text-center text-uppercase' style={{ color: '#6b4f4f', textDecoration: 'underline', marginBottom: '20px' }}>
                  Sign Up
                </h3>
                <div className='mb-3'>
                  <label htmlFor='name' style={{ fontWeight: 'bold', color: '#6b4f4f' }}>Full Name:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ border: '1px solid #d4af37' }}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='email' style={{ fontWeight: 'bold', color: '#6b4f4f' }}>Email:</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    value={email}
                    onChange={handleEmailInput}
                    required
                    style={{ border: '1px solid #d4af37' }}
                  />
                  <small style={{ color: emailValidationColor }}>{emailValidation}</small>
                </div>
                <div className='mb-3'>
                  <label htmlFor='telephone' style={{ fontWeight: 'bold', color: '#6b4f4f' }}>Phone Number:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='telephone'
                    value={telephone}
                    onChange={handleTelephoneInput}
                    required
                    style={{ border: '1px solid #d4af37' }}
                  />
                  <small style={{ color: telephoneValidationColor }}>{telephoneValidation}</small>
                </div>
                <div className='mb-3'>
                  <label htmlFor='address' style={{ fontWeight: 'bold', color: '#6b4f4f' }}>Address:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    style={{ border: '1px solid #d4af37' }}
                  />
                </div>
                <div className='mb-3'>
                 
                  
            
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' style={{ fontWeight: 'bold', color: '#6b4f4f' }}>Password:</label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    style={{ border: '1px solid #d4af37' }}
                  />
                  <small style={{ color: passwordValidationColor }}>{passwordValidation}</small>
                </div>
                <div className='mb-3'>
                  <label htmlFor='confirmPassword' style={{ fontWeight: 'bold', color: '#6b4f4f' }}>Confirm Password:</label>
                  <input
                    type='password'
                    className='form-control'
                    id='confirmPassword'
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    style={{ border: '1px solid #d4af37' }}
                  />
                  <small style={{ color: confirmPasswordValidationColor }}>{confirmPasswordValidation}</small>
                </div>
                <div className='text-center'>
                  <div className='d-grid gap-2 col-12 mx-auto'>
                    <MDBBtn
                      type='submit'
                      className='btn shadow-0'
                      onClick={handleRegistration}
                      style={{ backgroundColor: '#d4af37', color: '#fff', fontWeight: 'bold', borderRadius: '5px' }}
                    >
                      Register
                    </MDBBtn>
                  </div>
                </div>
                <hr style={{ marginTop: '10%', borderColor: '#d4af37' }} />
                <center>
                  <h6
                    className='text-uppercase'
                    style={{ cursor: 'pointer', color: '#6b4f4f', textDecoration: 'underline' }}
                    onClick={loginAction}
                  >
                    I Already Have an Account
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

export default Registration;
