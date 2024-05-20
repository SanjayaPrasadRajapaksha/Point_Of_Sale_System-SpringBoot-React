import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import { useAuth } from './utils/AuthContext';

function Customer() {

    const [customers, setCustomers] = useState('');
    const navigate = useNavigate()

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        axios.get('http://localhost:8080/customers', config)

            .then(function (response) {
                setCustomers(response.data)
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error)
            })
    }, [isAuthenticated])

    return (
        <div>
            <Navbar />
            <section class="vh-100 gradient-custom scroll">
                <div class="container h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-12 col-xl-12">
                            <div class="card shadow-lg card-registration rounded-15" >
                                <div class="card-body p-4 p-md-5 scroll">
                                    <h3 class="mb-0 pb-0 pb-md-0 mb-md-0">MANAGE CUSTOMERS</h3>
                                    <div className="text-right d-flex justify-content-end">
                                        <button type="button" class="btn btn-primary" onClick={() => {
                                            navigate('/customers/createCustomer')
                                        }}>Create Customer</button>
                                    </div>
                                    <br />
                                    <table class="table table-warning">
                                        <thead>
                                            <tr className='text-center'>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Contact</th>
                                                <th>Address</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                customers && customers.map(customers => {
                                                    return (
                                                        <tr className='text-center'>
                                                            <td>{customers.id}</td>
                                                            <td>{customers.title}.{customers.name}</td>
                                                            <td>{customers.email}</td>
                                                            <td>{customers.phone}</td>
                                                            <td>{customers.address}</td>
                                                            <td>
                                                                <button type='button' className='btn btn-success' onClick={() => {
                                                                    navigate(`/customers/${customers.id}/editCustomer`)
                                                                }}>Edit</button>
                                                                &nbsp;
                                                                &nbsp;
                                                                <button className='btn btn-danger' onClick={() => {
                                                                    axios.delete(`http://localhost:8080/customer/${customers.id}`, config)
                                                                        .then(function (response) {
                                                                            axios.get('http://localhost:8080/customers', config)

                                                                                .then(function (response) {
                                                                                    setCustomers(response.data)
                                                                                    console.log(response.data)

                                                                                })
                                                                                .catch(function (error) {
                                                                                    console.log(error)
                                                                                })
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

export default Customer