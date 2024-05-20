import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from './navbar/Navbar';
import { useAuth } from './utils/AuthContext';
function CreateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [categories, setCategories] = useState("");

    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    const [products, setProducts] = useState();
    const navigate = useNavigate()

    const { isAuthenticated, jwtToken } = useAuth();
    console.log(jwtToken);
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/categories",config)
            .then(response => {
                setCategories(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    })
    function createProduct(event) {
        event.preventDefault();

        const data = {
            name: name,
            price: price,
            quantity: quantity,
            imageUrl: uploadedImageUrl,
            category_id: category_id
        }

        axios.post("http://localhost:8080/product", data,config)
            .then(response => {
                if (response.request.status === 201) {
                    alert("Product Create Successfully..!");
                    document.getElementById('createProduct').reset()
                }
            })
            .catch(error => {
                alert("Product Create Fail..!");
                document.getElementById('createProduct').reset()
            });
    }

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handlePrice = (event) => {
        setPrice(event.target.value);
    };

    const handleQuantity = (event) => {
        setQuantity(event.target.value);
    };

    const handleCategory = (event) => {
        setCategory_id(event.target.value);
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
            <section class="vh-100 gradient-custom ">
                <div class="container py-2 h-100 ">
                    <div class="row justify-content-center align-items-center h-100 ">
                        <div class="col-12 col-lg-9 col-xl-7">
                            <div class="card shadow-lg card-registration round" >
                                <div class="card-body">
                                    <div className='text-right d-flex justify-content-between '>
                                        <h3 class="mb-4  pb-md-0 mb-md-4">Create Product Form</h3>
                                        &nbsp;&nbsp;
                                        {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" style={{ height: "110px", width: "110px", borderRadius: "100%", marginRight: "65px" }} />}
                                    </div>

                                    <form onSubmit={formik.handleSubmit}>
                                        <input type='file' name='image' onChange={(e) => formik.setFieldValue("image", e.target.files[0])} />

                                        {formik.errors.image && (
                                            <p style={{ color: 'red' }}>{formik.errors.image}</p>
                                        )}

                                        <button type='Submit' className='btn btn-success'>Upload</button>
                                    </form>
                                    <br />
                                    <form onSubmit={createProduct} id='createProduct'>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="name">Name</label>
                                                    <input type="text" id="name" class="form-control form-control-lg border-primary" required onChange={handleName} />
                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="price">Price</label>
                                                    <input type="text" id="price" class="form-control form-control-lg border-primary" required onChange={handlePrice} />

                                                </div>

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="quantity">Quantity</label>
                                                    <input type="text" id="quantity" class="form-control form-control-lg border-primary" required onChange={handleQuantity} />

                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <label class="form-label select-label">Choose option</label>
                                                <select class="select form-control-lg border-primary" onChange={handleCategory} required>
                                                    <option value="1" disabled selected>Choose your option</option>

                                                    {
                                                        categories && categories.map(category => {
                                                            return (
                                                                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                                                            )
                                                        })
                                                    }

                                                </select>


                                            </div>
                                        </div>


                                        <div class="mt-2 pt-2">
                                            <input class="btn btn-primary btn-lg" type="submit" value="Submit" required />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input class="btn btn-dark btn-lg" type="reset" value="Reset" required />
                                            <br />
                                            <br />
                                            <Link to='/products' className='back'>back</Link>
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

export default CreateProduct