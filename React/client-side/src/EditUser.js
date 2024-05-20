import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from './navbar/Navbar';
import { useAuth } from './utils/AuthContext';
function EditUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [imageUrl, setImageUrl] = useState(null);

    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    const { id } = useParams();

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }



    useEffect(() => {

        axios.get(`http://localhost:8080/user/${id}`,config)
            .then(response => {
                setUsername(response.data.username);
                setPassword(response.data.password);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setAddress(response.data.address);
                setImageUrl(response.data.imageUrl);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    function clearUser() {
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
            address: address,
            imageUrl: (uploadedImageUrl == null) ? imageUrl : uploadedImageUrl
        }

        axios.put(`http://localhost:8080/user/${id}`, data,config)
            .then(response => {
                if (response.request.status === 200) {
                    alert("User Edit Successfully..!");
                    clearUser();
                }
            })
            .catch(error => {
                alert("User Edit Fail..!");
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

    const formik = useFormik({
        initialValues: {
            image: null
        },
        validationSchema: Yup.object({
            image: Yup.mixed().required("Required.!")
                .test("FILE_SIZE", "Too big.!", (value) => value && value.size < 1024 * 1024)
                .test("FILE_TYPE", "Invalid file type.!", (value) => value && ['image/png', 'image/jpeg'].includes(value.type))
        }),

        onSubmit: async () => {
            const { image } = formik.values;
            const formData = new FormData();

            try {
                formData.append("file", image);
                formData.append("upload_preset", "xl8lkm3i");
                const res = await axios.post("https://api.cloudinary.com/v1_1/dh2vjivem/image/upload", formData);

                if (res.data && res.data.secure_url) {
                    setUploadedImageUrl(res.data.secure_url);
                    console.log("Uploaded image URL:", res.data.secure_url);

                } else {
                    console.error("Unable to retrieve secure URL from Cloudinary response.");
                }
            } catch (error) {
                console.error("Error uploading image to Cloudinary:", error);
            }
        }
    });
    return (
        <div>
            <Navbar />
            <section class="vh-100 gradient-custom">
                <div class="container py-2 h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-9 col-xl-7">
                            <div class="card shadow-lg card-registration round" >
                                <div class="card-body">
                                    <div className='text-right d-flex justify-content-between'>
                                        <h3 class="mb-5 pb-md-0 mb-md-5">Edit User Form</h3>
                                        {
                                            !uploadedImageUrl && <img src={imageUrl} alt="Uploaded" style={{ height: "110px", width: "110px", borderRadius: "100%" ,marginRight:"65px"  }} />
                                        }
                                        {
                                            uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" style={{ height: "110px", width: "110px", borderRadius: "100%" , marginRight:"65px"  }} />
                                        }
                                    </div>
                                    <form onSubmit={formik.handleSubmit}>
                                        <input type='file' name='image' onChange={(e) => formik.setFieldValue("image", e.target.files[0])} />

                                        {formik.errors.image && (
                                            <p style={{ color: 'red' }}>{formik.errors.image}</p>
                                        )}

                                        <button type='Submit' className='btn btn-success'>Upload</button>
                                    </form>
                                    <br />
                                    <form onSubmit={updateUser} id='updateUser'>

                                        <div class="row">
                                            <div class="col-md-6 mb-3">

                                                <div class="form-outline">
                                                    <label class="form-label" for="username">User Name</label>
                                                    <input type="text" id="username" class="form-control form-control-lg border-primary" required onChange={handleUsername} value={username} />
                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-3">

                                                <div class="form-outline">
                                                    <label class="form-label" for="password">Password</label>
                                                    <input type="password" id="password" class="form-control form-control-lg border-primary" required onChange={handlePassword} value={password} />

                                                </div>

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-3">

                                                <div class="form-outline">
                                                    <label class="form-label" for="email">Email</label>
                                                    <input type="email" id="username" class="form-control form-control-lg border-primary" required onChange={handleEmail} value={email} />

                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-3">

                                                <div class="form-outline">
                                                    <label class="form-label" for="phone">Phone</label>
                                                    <input type="text" id="phone" class="form-control form-control-lg border-primary" required onChange={handlePhone} value={phone} />

                                                </div>

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12 mb-3 pb-2">
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
                                                clearUser();
                                            }} required >Reset</button>
                                            <br />
                                            <br />
                                            <Link to='/users' class='back'>back</Link>
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