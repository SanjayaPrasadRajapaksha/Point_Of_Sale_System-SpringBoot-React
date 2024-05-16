import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
function CreateCategory() {
    const [category_name, setCategory_name] = useState("");

    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    function createCategory(event) {
        event.preventDefault();

        const data = {
            category_name: category_name,
            imageUrl: uploadedImageUrl

        }

        axios.post("http://localhost:8080/category", data)
            .then(response => {
                if (response.request.status === 201) {
                    alert("Category Create Successfully..!");
                    document.getElementById('createCategory').reset()
                }
            })
            .catch(error => {
                alert("Category Create Fail..!");
                document.getElementById('createCategory').reset()
            });
    }

    const handleCategory_name = (event) => {
        setCategory_name(event.target.value);
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
                <div class="container py-2 h-100 ">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-9 col-xl-7">
                            <div class="card shadow-lg card-registration round" >
                                <div class="card-body">
                                <div className='text-right d-flex justify-content-between '>
                                        <h3 class="mb-4  pb-md-0 mb-md-4">Create User Form</h3>

                                        {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" style={{ height: "90px", width:"90px", borderRadius: "100%" }} />}
                                    </div>
                                   
                                    <form onSubmit={formik.handleSubmit}>
                                        <input type='file' name='image' onChange={(e) => formik.setFieldValue("image", e.target.files[0])} />

                                        {formik.errors.image && (
                                            <p style={{ color: 'red' }}>{formik.errors.image}</p>
                                        )}

                                        <button type='Submit' className='btn btn-success'>Upload</button>
                                    </form>
                                    <br/>
                                    <form onSubmit={createCategory} id='createCategory'>

                                        <div class="row">
                                            <div class="col-md-12 mb-8">

                                                <div class="form-outline">
                                                    <label class="form-label" for="category_name">Category Name</label>
                                                    <input type="text" id="category_name" class="form-control form-control-lg" required onChange={handleCategory_name} />
                                                </div>

                                            </div>

                                        </div>

                                        <div class="mt-2 pt-2">
                                            <input class="btn btn-primary btn-lg" type="submit" value="Submit" required />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input class="btn btn-dark btn-lg" type="reset" value="Reset" required />
                                            <br />
                                            <br />
                                            <Link to='/categories' class='back'>back</Link>
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

export default CreateCategory