import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from './utils/AuthContext';
import { Link, useNavigate } from 'react-router-dom';




function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password
        }

        axios.post('http://localhost:8080/auth/login', data)
            .then(response => {
                login(response.data);
                navigate('/home');
            })
            .catch(err => {
                alert("Login fail..!");
                console.log(err);
            });
    }


    return (

        <section class="vh-100 gradient-custom bground">
            <div class="container h-100 ">
                <div class="row justify-content-center align-items-center h-100">
                    <div class="col-6">
                        <div class="card shadow-lg card-registration round formBackground" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                            <div class="card-body p-4"  >
                                <h3 class="mb-3  pb-md-0 mb-md-4">Login Form</h3>
                                <form onSubmit={(handleLogin)}>
                                    <div class="row">
                                        <div class="col-md-12 mb-12" >
                                            <div class="form-outline">
                                                <label class="form-label" for="username">Username</label>
                                                <input type="text" id="username" onChange={(e) => {
                                                    setUsername(e.target.value);
                                                }} class="form-control border-primary form-control-lg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 mb-12">

                                            <div class="form-outline">
                                                <label class="form-label" for="email">Password</label>
                                                <input type="password" id="email" onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }} class="form-control border-primary form-control-lg" required />

                                            </div>
                                            <br />
                                            <div className='col-md-12 mb-12'>

                                            <button class="btn btn-primary" type="submit" >Submit</button>

                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login