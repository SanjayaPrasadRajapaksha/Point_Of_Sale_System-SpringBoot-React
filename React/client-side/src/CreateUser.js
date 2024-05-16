import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';


import { useFormik } from 'formik';
import * as Yup from 'yup';



function CreateUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    function createUser(event) {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            phone: phone,
            address: address,
            imageUrl: uploadedImageUrl
        }

        axios.post("http://localhost:8080/user", data)
            .then(response => {
                if (response.request.status === 201) {
                    alert("User Create Successfully..!");
                    document.getElementById('createUser').reset()
                }
            })
            .catch(error => {
                alert("User Create Fail..!");
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
            <section class="vh-100 gradient-custom">
                <div class="container h-100 ">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-9 col-xl-7">
                            <div class="card shadow-lg card-registration round" >
                                <div class="card-body">
                                    <div className='text-right d-flex justify-content-between '>
                                        <h3 class="mb-3  pb-md-0 mb-md-4">Create User Form</h3>
                                        &nbsp;&nbsp;
                                        {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" style={{ height: "90px", width:"90px", borderRadius: "100%" }} />}
                                    </div>
                                   
                                    <form onSubmit={formik.handleSubmit}>
                                        <input  type='file' name='image' onChange={(e) => formik.setFieldValue("image", e.target.files[0])} />

                                        {formik.errors.image && (
                                            <p style={{ color: 'red' }}>{formik.errors.image}</p>
                                        )}

                                        <button type='Submit' className='btn btn-success'>Upload</button>
                                    </form>
                                    <br/>
                                    <form onSubmit={createUser} id='createUser'>
                                        <div class="row">
                                            <div class="col-md-6 mb-3">

                                                <div class="form-outline">
                                                    <label class="form-label" for="username">Username</label>
                                                    <input  type="text" id="username" class="form-control border-primary form-control-lg" required onChange={handleUsername} />
                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-3">

                                                <div class="form-outline">
                                                    <label class="form-label" for="password">Password</label>
                                                    <input type="password" id="password" class="form-control border-primary form-control-lg" required onChange={handlePassword} />

                                                </div>

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-3">

                                                <div class="form-outline">
                                                    <label class="form-label" for="email">Email</label>
                                                    <input type="email" id="email" class="form-control border-primary form-control-lg" required onChange={handleEmail} />

                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-3">

                                                <div class="form-outline">
                                                    <label class="form-label" for="phone">Phone</label>
                                                    <input type="text" id="phone" class="form-control border-primary form-control-lg" required onChange={handlePhone} />

                                                </div>

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12 mb-3 pb-2">
                                                <div class="form-outline">
                                                    <label class="form-label" for="address">Address</label>
                                                    <input type="text" id="address" class="form-control border-primary form-control-lg" required onChange={handleAddress} />

                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-2 ">
                                            <input class="btn btn-primary btn-lg" type="submit" value="Submit" required />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input class="btn btn-dark btn-lg" type="reset" value="Reset" required />
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

export default CreateUser