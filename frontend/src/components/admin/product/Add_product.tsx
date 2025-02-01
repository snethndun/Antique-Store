import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from '../Nav';

interface ProductData {
  productName: string;
  productPrice: string;
  productQuantity: string;
  productCondition: string;
  productImage: string;
  status : string,
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}


function AddProduct(): JSX.Element {
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [productQuantity, setProductQuantity] = useState<string>('');
  const [productCondition, setProductCondition] = useState<string>('');
  const [productImage, setProductImage] = useState<string>('');

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleProductPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductPrice(e.target.value);
  };

  const handleProductQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductQuantity(e.target.value);
  };

  const handleProductConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductCondition(e.target.value);
  };

  const handleProductImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default'); 
  
      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dnomnqmne/image/upload", {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Image uploaded to Cloudinary:', data);
          setProductImage(data.secure_url);
        } else {
          console.error('Failed to upload image to Cloudinary');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  

  
  const AddProductAction = async (): Promise<void> => {
    try {

      if (!productName || !productPrice || !productQuantity || !productCondition || !productImage) {
            Swal.fire({
              icon: 'error',
              title: 'Missing Information',
              text: 'Please fill in all the required fields.',
            });
            return;
      }

      const productData: ProductData = {
        productName: productName,
        productPrice: productPrice,
        productQuantity: productQuantity,
        productCondition: productCondition,
        productImage: productImage,
        status :'available',
        timestamps: {
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
      };
  
      const response = await axios.post("http://localhost:5000/products/AddProducts", productData);
      console.log(response.data); 

      Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Product Saving Successful!',
      }).then((result) => {
          if (result.isConfirmed) {
              window.location.href = '/admin/product';
              clearFields();
          }
      });
    } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Product saving failed. Please try again.',
        });
        console.error('Product saving failed:', error);
    }
  };


  function clearFields() {
    setProductName('');
    setProductPrice('');
    setProductQuantity('');
    setProductCondition('');
    setProductImage('');
  }

  function back(){
    window.location.href="/admin/product";
  }

  return (
    <>
      <NavBar/>
      <div style={{ backgroundColor: '#E2E7E9' }}>
        <main style={{ paddingTop: '58px', backgroundColor: '#D7DDDC' }}>
          <div className='container pt-5 pb-5'>
            <div className='container'>
                <h4 className='text-uppercase ' style={{color:'black'}}>Admin Dashboard</h4>
                <p style={{fontSize:'18px' , lineHeight:'20px'}}>Products Managing</p>
                <hr/>
                <div className='text-end'>
                    <button className='btn btn-outline-dark' onClick={back}>Back</button>&nbsp;
                </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center pb-5">
            <div className="border rounded bg-white" style={{ width: '83%' , padding:'3%' }}>
              <h2 className="text-center mb-4">Add Product</h2>
             
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">Product Name</label>
                <input type="text" className="form-control" id="productName" value={productName} onChange={handleProductNameChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">Product Price (LKR)</label>
                <input type="text" className="form-control" id="productPrice" value={productPrice} onChange={handleProductPriceChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="productQuantity" className="form-label">Product Quantity</label>
                <input type="text" className="form-control" id="productQuantity" value={productQuantity} onChange={handleProductQuantityChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="productCondition" className="form-label">Condition</label>
                <select className="form-select" id="productCondition"  value={productCondition} onChange={handleProductConditionChange} >
                  <option value="">Select Condition</option>
                  <option value="brand_new">Good</option>
                  <option value="used">Needs Restoration</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="productImage" className="form-label">Image File</label>
                <input type="file" className="form-control" id="productImage" onChange={handleProductImageChange} />
                <small>{productImage}</small>
              </div>
              
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-dark" onClick={AddProductAction}>Submit</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AddProduct;
