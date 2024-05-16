import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function EditCategory() {
    const [category_name, setCategory_name] = useState("");

    const { id } = useParams();

    useEffect(() => {

        axios.get(`http://localhost:8080/category/${id}`)
            .then(response => {
                setCategory_name(response.data.category_name);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    function clearCategory() {
        setCategory_name("");
    }

    function updateCategory(event) {
        event.preventDefault();

        const data = {
            category_name: category_name,
        }

        axios.put(`http://localhost:8080/category/${id}`, data)
            .then(response => {
                if (response.request.status === 200) {
                    alert("Category Edit Successfully..!");
                    clearCategory();
                }
            })
            .catch(error => {
                alert("User Edit Fail..!");
                clearCategory();
            });
    }

    const handleCategory = (event) => {
        setCategory_name(event.target.value);
    };

    return (
        <div>
            <section class="vh-100 gradient-custom">
                <div class="container py-2 h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-9 col-xl-7">
                            <div class="card shadow-lg card-registration round" >
                                <div class="card-body p-4 p-md-5">
                                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Edit Category Form</h3>
                                    <form onSubmit={updateCategory} id='updateUser'>

                                        <div class="row">
                                            <div class="col-md-12 mb-8">

                                                <div class="form-outline">
                                                    <label class="form-label" for="category_name">Category Name</label>
                                                    <input type="text" id="category_name" class="form-control form-control-lg border-primary" required onChange={handleCategory} value={category_name} />
                                                </div>

                                            </div>
                                        </div>

                                        <div class="mt-2 pt-2 ">
                                            <button class="btn btn-primary btn-lg" type="submit" >Submit</button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <button class="btn btn-dark btn-lg" type="buttton" onClick={() => {
                                                clearCategory();
                                            }} required >Reset</button>
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

export default EditCategory