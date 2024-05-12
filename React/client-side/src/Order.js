import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

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

            <section class="vh-100 gradient-custom  bg-secondary bg-gradient scroll">
                <div class="container py-2 h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-12 col-xl-12">
                            <div class="card shadow-2-strong card-registration rounded-15" >
                                <div class="card-body p-4 p-md-5">
                                    <h3 class="mb-0 pb-0 pb-md-0 mb-md-0">Manage Orders</h3>
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
                                    <table class="table table-striped bg-light">
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
                                                            <td>{orders.completeOrder ? 'Placed' : 'pending'}</td>

                                                            <td>
                                                                <button type='button' className='btn btn-success' onClick={() => {
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