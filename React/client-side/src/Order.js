import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


function Order() {

    const [orders, setOrders] = useState(null);
    const [ customer, setCustomer ] = useState('');
    const [ customer_id, setCustomer_id ] = useState('');
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
 
function handleCustomer_id (event) {
    setCustomer_id(event.target.value);
}

    return (
        <div>
            <Navbar />
            <section class="vh-100 gradient-custom scroll">
                <div className="container h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-12 col-xl-12 ">
                            <div class="card shadow-lg card-registration rounded-15" >
                                <div class="card-body p-4 p-md-5 scroll">
                                    <h3 class="mb-0 pb-0 pb-md-0 mb-md-0">MANAGE ORDERS</h3>
                                    <br />
                                    <div className="text-right d-flex justify-content-between ">
                                        <div>
                                            <input id='fieldClear' type='text' placeholder='Customer ID' onChange={handleCustomer_id} />
                                            &nbsp;
                                            <button type='button' className='btn btn-secondary' onClick={() => {

                                                axios.get(`http://localhost:8080/customer/${customer_id}`)
                                                    .then(function (response) {
                                                      setCustomer(response.data);
                                                    })
                                                    .catch(function (error) {
                                                        alert("Invalid Customer ID: " + customer_id)
                                                       
                                                    });
                                            }}
                                            >Search</button>
                                        </div>
                                        {
                                            customer &&
                                            <div>
                                                <h5>ID :  {customer.id} &nbsp;&nbsp;  Name : {customer.title}.{customer.name}  </h5>
                                            </div>
                                        }
                                        <div>

                                            <button type="button" class="btn btn-primary" onClick={() => {
                                                axios.post(`http://localhost:8080/orders/${customer.id}`)
                                                    .then(function (response) {
                                                        navigate(`/orders/${response.data.id}/editOrder`)
                                                    })
                                                    .catch(function (error) {
                                                        alert("Please Search Customer..!")
                                                    });

                                            }}>Create Orders</button>
                                        </div>

                                    </div>
                                    <br />
                                    <table className="table table-warning">
                                        <thead>
                                            <tr className='text-center'>
                                                <th>#</th>
                                                <th> Name </th>
                                                <th>Address </th>
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
                                                           
                                                            <td>{orders.customer?.title}.{orders.customer?.name}</td>
                                                            <td>{orders.customer.address}</td>
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