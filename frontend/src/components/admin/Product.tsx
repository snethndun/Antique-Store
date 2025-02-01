import React, { useState, useEffect } from 'react';
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './Nav';

interface ProductData {
    _id: string;
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


function Products(): JSX.Element {
  
    const [allProducts, setAllProducts] = useState<ProductData[]>([]);

    const fetctProductData = async () => {
        try {
            const response = await axios.get<ProductData[]>('http://localhost:5000/products/allProducts'); 
            setAllProducts(response.data);
          } catch (error) {
            console.error('Error fetching product data:', error);
          }
    }

    useEffect(() => {
        fetctProductData();
    }, []); 
    
    const add_product = (): void => {
        window.location.href="/admin/addProduct";
    };

    function back(){
        window.location.href="/admin/dashboard";
    }

    const handleDelete = (productId: string) => {
        Swal.fire({
          title: 'Delete Product',
          text: 'Are you sure you want to delete this product?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:5000/products/deleteProducts/${productId}`);
        
                if (response.status === 200) {
                  Swal.fire('Deleted!', 'The item has been deleted.', 'success');
                  fetctProductData();
                } else {
                  Swal.fire('Error!', 'Failed to delete the item.', 'error');
                }
              } catch (error) {
                // Handle Axios request error
                Swal.fire('Error!', 'An error occurred while deleting the item.', 'error');
                console.error('Error deleting item:', error);
              }
          }
        });
    };
 
  

    const handleEdit = (selectedProduct: ProductData) => {
        Swal.fire({
            title: 'Edit Product',
            text: 'Are you sure you want to edit this product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, edit it!',
          }).then(async (result) => {
            if (result.isConfirmed) {
                
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
                <p style={{fontSize:'18px' , lineHeight:'20px'}}>Products Managing</p>
                <hr/>
                <div className='text-end'>
                    <button className='btn btn-outline-dark' onClick={back}>Back</button>&nbsp;
                    <button className='btn btn-dark ' onClick={add_product}>Add Product</button>
                </div>
           
                <MDBTable className='mt-4'>
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'  className='text-center'>Product Name</th>
                                <th scope='col'  className='text-center'>Price</th>
                                <th scope='col'  className='text-center'>Quantity</th>
                                <th scope='col'  className='text-center'>Status</th>
                                <th scope='col'  className='text-center'>Condition</th>
                                <th scope='col' className='text-center'>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody className='bg-white'>
                            {allProducts.map((product, index) => (
                                <tr key={index}>
                                    <td className='text-center'>{product.productName}</td>
                                    <td className='text-center'>LKR. {product.productPrice}</td>
                                    <td className='text-center'>{product.productQuantity}</td>
                                    <td className='text-center'>{product.status}</td>
                                    <td className='text-center'>{product.productCondition}</td>
                                    <td className='text-center'>
                                        <button className='btn btn-success btn-sm shadow-0' onClick={() => handleEdit(product)}>Edit</button>{ ' '}
                                        <button className='btn btn-danger btn-sm shadow-0' onClick={() => handleDelete(product._id)}>Delete</button>
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

export default Products;
