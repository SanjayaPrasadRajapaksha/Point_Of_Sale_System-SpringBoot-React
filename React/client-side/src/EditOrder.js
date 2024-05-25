import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from './navbar/Navbar';
import { useAuth } from './utils/AuthContext';
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';

function EditOrder() {

    const { id } = useParams();
    const [order, setOrder] = useState('');
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');


    const navigate = useNavigate();


    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/order/${id}`, config)
            .then(response => {
                setOrder(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('http://localhost:8080/products', config)
            .then(response => {
                setProduct(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [isAuthenticated])

    function handleQty(event) {
        setQuantity(event.target.value);

    }

    function refreshProducts() {

        axios.get('http://localhost:8080/products', config)
            .then(response => {
                setProduct(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`http://localhost:8080/order/${id}`, config)
            .then(response => {
                setOrder(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    function placeOrder() {

        axios.get(`http://localhost:8080/placeOrder/${id}`, config)
            .then(function (response) {
                alert("Order Place Successfullly..!")
                navigate('/orders')

            })
            .catch(function (error) {
                alert("Order Place Fail..!")
                console.log(error)
            });
    }

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
        <Header openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <main class="main-container" >
                <div class="main-card shadow  bg-white rounded" style={{ padding: "25px" }}>
                    <div className=' mb-4 pb-md-0 mb-md-5' style={{ borderRadius: '1rem', maxWidth: '800px' }}>
                    <h3 class="">Add Product to Order #{id}</h3>
                    </div>
                    
                    {order &&
                        <div>
                            <div className='d-flex align-item-center justify-content-between'>
                                <div>
                                    <h5>Date & Time : {order.orderDate}</h5>
                                </div>
                                <div>
                                    <h5>Customer Name : {order.customer.name}</h5>
                                </div>
                                <div>
                                    <h5>Total Price : Rs. {order.totalPrice}</h5>
                                </div>
                            </div>

                            <div className='row '>
                                <div className='col-md-9 scroll-2 text-center'>
                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                order && order.orderedProducts.map((product) => {
                                                    return (
                                                        <tr>
                                                            <td>{product.id}</td>
                                                            <td>{product.name}</td>
                                                            <td>{product.price}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>

                                    </table>

                                </div>

                                <div className='col-md-3'>
                                    <div className='scroll-2 justify-content-center align-items-center'>
                                        {
                                            product && product.map((product) => {
                                                return (
                                                    <div key={product.id}>

                                                        <div className='product p-3 bg-light shadow-sm mb-3 rounded'>

                                                            <h5>{product.name}</h5>

                                                            <div className='product-price'>
                                                                Rs. {product.price}
                                                            </div>

                                                            <div className='product-price'>
                                                                Qty : {product.quantity}
                                                            </div>
                                                            <div>

                                                                <input size={7} className='justify-content: center' placeholder='quantity' id='qty_field' onChange={handleQty} />

                                                                &nbsp;

                                                                <button className='btn btn-primary' id='addBtn' onClick={() => {


                                                                    if ((product.quantity - quantity) < 0 || product.quantity === 0) {
                                                                        alert("Product is out of stock");


                                                                    } else {

                                                                        const data = {
                                                                            product_id: product.id,
                                                                            quantity: quantity
                                                                        }
                                                                        axios.post(`http://localhost:8080/order/${id}/addProduct`, data, config)
                                                                            .then(function (response) {
                                                                                setOrder(response.data);
                                                                                alert("Product Add Successfully..!")

                                                                            })
                                                                            .catch(function (error) {
                                                                                alert("Product Add Fail..!")
                                                                                console.log(error);
                                                                            });

                                                                        const productData = {
                                                                            product_id: product.id,
                                                                            name: product.name,
                                                                            price: product.price,
                                                                            quantity: product.quantity - quantity,
                                                                            category_id: product.category?.category_id,
                                                                            imageUrl: product.imageUrl
                                                                        }

                                                                        axios.put('http://localhost:8080/product/' + product.id, productData, config)
                                                                            .then(function (response) {
                                                                                refreshProducts();

                                                                            })
                                                                            .catch(function (err) {
                                                                                console.log(err);
                                                                            });
                                                                    }


                                                                }}>Add</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>

                                </div>

                            </div>
                            <br />
                            <div className='d-flex justify-content-between'>
                                <Link to='/orders' className='back'>back</Link>
                                <button className=' btn btn-success text-right d-flex justify-content-end' onClick={placeOrder}>Place order</button>
                            </div>

                        </div>

                    }

                </div>

            </main>

        </div>
    )
}

export default EditOrder