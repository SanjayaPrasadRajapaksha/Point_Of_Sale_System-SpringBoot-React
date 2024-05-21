import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import { useAuth } from './utils/AuthContext';


const Product = () => {
    const [products, setProducts] = useState();
    const navigate = useNavigate()

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {

        axios.get('http://localhost:8080/products', config)

            .then(function (response) {
                setProducts(response.data)
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error)
            });

    }, [isAuthenticated])

    return (
        <div>
            <Navbar />
            <section class="vh-100 gradient-custom scroll">
                <div className="container h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-12 col-xl-12 ">
                            <div class="card shadow-lg card-registration rounded-15 " >
                                <div class="card-body p-4 p-md-5 scroll">
                                    <h3 class="mb-0 pb-0 pb-md-0 mb-md-0">MANAGE PRODUCTS</h3>
                                    <div className="text-right d-flex justify-content-end">
                                        <button type="button" class="btn btn-primary" onClick={() => {
                                            navigate('/products/createProduct')
                                        }}>Create Product</button>
                                    </div>
                                    <br />
                                    <table class="table table-warning">
                                        <thead>
                                            <tr className='text-center'>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Category</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products && products.map(product => {
                                                    return (
                                                        <tr className='text-center'>
                                                            <td>{<img src={product.imageUrl} alt="Uploaded" style={{ height: "50px", width: "50px", borderRadius: "100%" }} />}</td>
                                                            <td>{product.name}</td>
                                                            <td>{product.price}</td>
                                                            <td>{product.quantity}</td>
                                                            <td>{product.category?.category_name}</td>
                                                            <td>
                                                                <button type='button' className='btn btn-success' onClick={() => {
                                                                    navigate(`/products/${product.id}/editProduct`)
                                                                }}>Edit</button>
                                                                &nbsp;
                                                                &nbsp;
                                                                <button className='btn btn-danger' onClick={() => {
                                                                    axios.delete(`http://localhost:8080/product/${product.id}`, config)
                                                                        .then(function (response) {
                                                                            axios.get('http://localhost:8080/products', config)

                                                                                .then(function (response) {
                                                                                    setProducts(response.data)
                                                                                    console.log(response.data)

                                                                                })
                                                                                .catch(function (error) {
                                                                                    console.log(error)
                                                                                });

                                                                        })
                                                                        .catch(function (error) {
                                                                            console.log(error)
                                                                        })
                                                                }}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Product