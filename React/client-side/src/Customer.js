import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import { useAuth } from './utils/AuthContext';
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';

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

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
        <Header openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <main className='main-container'>
            <div class="main-card">
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
            </main>


        </div>

    )
}

export default Customer