import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditOrder() {

    const { id } = useParams();
    const [order, setOrder] = useState('');
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');


    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8080/order/${id}`)
            .then(response => {
                setOrder(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('http://localhost:8080/products')
            .then(response => {
                setProduct(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },)

    function handleQty(event) {
        setQuantity(event.target.value);

    }

    function refreshProducts() {

        axios.get('http://localhost:8080/products')
            .then(response => {
                setProduct(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`http://localhost:8080/order/${id}`)
            .then(response => {
                setOrder(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <section class="vh-100 gradient-custom scroll">
                <div class="container py-2 h-100 ">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-mb-12">
                            <div class="card shadow-lg card-registration round" >
                                <div class="card-body p-4 p-md-5">
                                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Add Product to Order #{id}</h3>

                                    {
                                        order &&
                                        <div>

                                            <div className='d-flex align-item-center justify-content-between'>

                                                <div>
                                                    <h5>Date & Time : {order.orderDate}</h5>
                                                </div>
                                                <div>
                                                    <h5>Customar Name : {order.customer.name}</h5>
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
                                                                                        axios.post(`http://localhost:8080/order/${id}/addProduct`, data)
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
                                                                                            category_id: product.category?.category_id
                                                                                        }

                                                                                        axios.put('http://localhost:8080/product/' + product.id, productData)
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
                                                <button className=' btn btn-success text-right d-flex justify-content-end' onClick={() => {
                                                    axios.post(`http://localhost:8080/order/${id}`)
                                                        .then(function (response) {
                                                            alert("Order Place Successfullly..!")
                                                            navigate('/orders')

                                                        })
                                                        .catch(function (error) {
                                                            alert("Order Place Fail..!")
                                                            console.log(error)
                                                        })
                                                }}>Place order</button>
                                            </div>

                                        </div>

                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditOrder