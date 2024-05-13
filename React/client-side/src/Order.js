import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


function Order() {

    const [orders, setOrders] = useState(null);
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('http://localhost:8080/orders')

            .then(function (response) {
                setOrders(response.data)
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error)
            }, [])
    })

    return (
        <div>
            <Navbar />
            <section class="vh-100 gradient-custom scroll">
                <div className="container h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-12 col-xl-12 ">
                            <div class="card shadow card-registration rounded-15" >
                                <div class="card-body p-4 p-md-5 scroll">
                                    <h3 class="mb-0 pb-0 pb-md-0 mb-md-0">MANAGE ORDERS</h3>
                                    <div className="text-right d-flex justify-content-end">
                                        <button type="button" class="btn btn-primary" onClick={() => {
                                            axios.post('http://localhost:8080/order')
                                                .then(function (response) {
                                                    navigate(`/orders/${response.data.id}/editOrder`)
                                                })
                                                .catch(function (error) {
                                                    console.log(error)

                                                });

                                        }}>Create Orders</button>

                                    </div>
                                    <br />
                                    <table className="table table-striped table-dark ">
                                        <thead>
                                            <tr className='text-center'>
                                                <th>#</th>
                                                <th>Date & Time</th>
                                                <th>Total Items</th>
                                                <th>Total Price</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orders && orders.map(orders => {
                                                    return (
                                                        <tr className='text-center'>
                                                            <td>{orders.id}</td>
                                                            <td>{orders.orderDate}</td>
                                                            <td>{orders.orderedProducts.length}</td>
                                                            <td>{orders.totalPrice}</td>
                                                            <td>{orders.completeOrder ? 'Paid' : 'pending'}</td>

                                                            <td>

                                                                <button disabled={orders.completeOrder ? true : false} type='button' className='btn btn-success' onClick={() => {
                                                                    navigate(`/orders/${orders.id}/editOrder`)
                                                                }}>Edit</button>
                                                                &nbsp;
                                                                &nbsp;
                                                                <button className='btn btn-danger' onClick={() => {
                                                                    axios.delete(`http://localhost:8080/order/${orders.id}`)
                                                                        .then(function (response) {

                                                                            setOrders();
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

export default Order