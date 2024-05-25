import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import { useAuth } from './utils/AuthContext';
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';

function EditCustomer() {
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");


    const { id } = useParams();

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {

        axios.get(`http://localhost:8080/customer/${id}`, config)
            .then(response => {
                setTitle(response.data.title);
                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setAddress(response.data.address);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id, isAuthenticated]);

    function clearCustomer() {
        setTitle("");
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
    }

    function updateCustomer(event) {
        event.preventDefault();

        const data = {
            title: title,
            name: name,
            email: email,
            phone: phone,
            address: address
        }

        axios.put(`http://localhost:8080/customer/${id}`, data, config)
            .then(response => {
                if (response.request.status === 200) {
                    alert("Customer Edit Successfully..!");
                    clearCustomer();
                }
            })
            .catch(error => {
                alert("Customer Edit Fail..!");
                clearCustomer();
            });
    }

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePhone = (event) => {
        setPhone(event.target.value);
    };

    const handleAddress = (event) => {
        setAddress(event.target.value);
    };

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <div class="main-container">
                <div class="main-card shadow  bg-white rounded" style={{ padding: "25px" }}>
                    <div className='text-right d-flex justify-content-between' style={{ borderRadius: '1rem', maxWidth: '800px', margin: "auto" }}>
                        <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Edit Customer Form</h3>
                    </div>

                    <form onSubmit={updateCustomer} id='updateUser' style={{ borderRadius: '1rem', maxWidth: '800px', margin: "auto" }}>
                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="title">Title</label>
                                    <input type="text" id="title" class="form-control form-control-lg border-primary" required onChange={handleTitle} value={title} />
                                </div>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="name">Name</label>
                                    <input type="text" id="name" class="form-control form-control-lg border-primary" required onChange={handleName} value={name} />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="email">Email</label>
                                    <input type="email" id="email" class="form-control form-control-lg border-primary" required onChange={handleEmail} value={email} />
                                </div>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="phone">Phone</label>
                                    <input type="text" id="phone" class="form-control form-control-lg border-primary" required onChange={handlePhone} value={phone} />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 mb-4 pb-2">
                                <div class="form-outline">
                                    <label class="form-label" for="address">Address</label>
                                    <input type="text" id="address" class="form-control form-control-lg border-primary" required onChange={handleAddress} value={address} />
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 pt-2 ">
                            <button class="btn btn-primary btn-lg" type="submit" >Submit</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button class="btn btn-dark btn-lg" type="buttton" onClick={() => {
                                clearCustomer();
                            }} required >Reset</button>
                            <br />
                            <br />
                            <Link to='/customers' class='back'>back</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default EditCustomer