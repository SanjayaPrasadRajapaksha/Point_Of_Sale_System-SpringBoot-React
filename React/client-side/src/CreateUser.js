import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function CreateUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    function createUser(event) {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            phone: phone,
            address: address
        }

        axios.post("http://localhost:8080/user", data)
            .then(response => {
                if (response.request.status === 201) {
                    alert("User Create Successfully");
                    document.getElementById('createUser').reset()
                }
            })
            .catch(error => {
                alert("User Create Failed");
                document.getElementById('createUser').reset()
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
                <div class="container py-2 h-100 ">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-9 col-xl-7">
                            <div class="card shadow-2-strong card-registration rounded-15" >
                                <div class="card-body p-4 p-md-5">
                                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Create User Form</h3>
                                    <form onSubmit={createUser} id='createUser'>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="username">User Name</label>
                                                    <input type="text" id="username" class="form-control form-control-lg" required onChange={handleUsername} />
                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="password">Password</label>
                                                    <input type="password" id="password" class="form-control form-control-lg" required onChange={handlePassword} />

                                                </div>

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="email">Email</label>
                                                    <input type="email" id="username" class="form-control form-control-lg" required onChange={handleEmail} />

                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="phone">Phone</label>
                                                    <input type="text" id="phone" class="form-control form-control-lg" required onChange={handlePhone} />

                                                </div>

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12 mb-4 pb-2">
                                                <div class="form-outline">
                                                    <label class="form-label" for="address">Address</label>
                                                    <input type="text" id="address" class="form-control form-control-lg" required onChange={handleAddress} />

                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-2 pt-2">
                                            <input class="btn btn-primary btn-lg" type="submit" value="Submit" required />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input class="btn btn-dark btn-lg" type="reset" value="Reset" required />
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

export default CreateUser