import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function EditUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");


    const {id} = useParams();

    useEffect(()=>{

        axios.get(`http://localhost:8080/user/${id}` )
           .then(response => {
                setUsername(response.data.username);
                setPassword(response.data.password);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setAddress(response.data.address);
            })
           .catch(error => {
                console.log(error);
            });
    },[id]);

    function clearUser(){
        setUsername("");
        setPassword("");
        setEmail("");
        setPhone("");
        setAddress("");
    }

    function updateUser(event) {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            phone: phone,
            address: address
        }

        axios.put(`http://localhost:8080/user/${id}`, data)
            .then(response => {
                if (response.request.status === 200) {
                    alert("User Edit Successfully");
                    clearUser();
                }
            })
            .catch(error => {
                alert("User Edit Failed");
                clearUser();
            });
    }

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
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

    return (
        <div>
            <section class="vh-100 gradient-custom  bg-secondary bg-gradient">
                <div class="container py-2 h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-9 col-xl-7">
                            <div class="card shadow-2-strong card-registration rounded-15" >
                                <div class="card-body p-4 p-md-5">
                                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Edit User Form</h3>
                                    <form onSubmit={updateUser} id='updateUser'>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="username">User Name</label>
                                                    <input type="text" id="username" class="form-control form-control-lg" required onChange={handleUsername} value={username}/>
                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="password">Password</label>
                                                    <input type="password" id="password" class="form-control form-control-lg" required onChange={handlePassword} value={password}/>

                                                </div>

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="email">Email</label>
                                                    <input type="email" id="username" class="form-control form-control-lg" required onChange={handleEmail} value={email}/>

                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="phone">Phone</label>
                                                    <input type="text" id="phone" class="form-control form-control-lg" required onChange={handlePhone} value={phone}/>

                                                </div>

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12 mb-4 pb-2">
                                                <div class="form-outline">
                                                    <label class="form-label" for="address">Address</label>
                                                    <input type="text" id="address" class="form-control form-control-lg" required onChange={handleAddress} value={address}/>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-2 pt-2 ">
                                            <button class="btn btn-primary btn-lg" type="submit" >Submit</button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <button class="btn btn-dark btn-lg" type="buttton" onClick={()=>{
                                                clearUser();
                                        }} required >Reset</button>
                                            <br />
                                            <br />
                                            <Link to='/users' class='back'>Back</Link>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditUser