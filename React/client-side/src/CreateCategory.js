import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import { useAuth } from './utils/AuthContext';

function CreateCategory() {
    const [category_name, setCategory_name] = useState("");

    const { jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    function createCategory(event) {
        event.preventDefault();

        const data = {
            category_name: category_name,

        }


        axios.post("http://localhost:8080/category", data, config)
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


    return (
        <div>
            <Navbar />
            <section class="vh-100 gradient-custom">
                <div class="container py-2 h-100 ">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-9 col-xl-7">
                            <div class="card shadow-lg card-registration round" >
                                <div class="card-body">
                                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Create Category Form</h3>
                                    <form onSubmit={createCategory} id='createCategory'>

                                        <div class="row">
                                            <div class="col-md-12 mb-8">

                                                <div class="form-outline">
                                                    <label class="form-label" for="category_name">Category Name</label>
                                                    <input type="text" id="category_name" class="form-control form-control-lg border-primary" required onChange={handleCategory_name} />
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