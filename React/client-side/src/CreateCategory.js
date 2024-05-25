import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import { useAuth } from './utils/AuthContext';
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';

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
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <main class="main-container " >
                <div class="main-card  shadow  bg-white rounded" style={{ padding: "130px", }} >
                    <div className='text-right d-flex justify-content-between ' style={{ borderRadius: '1rem', maxWidth: '600px', margin: "auto" }}>
                        <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Create Category Form</h3>
                    </div>
                    <form onSubmit={createCategory} id='createCategory'style={{ borderRadius: '1rem', maxWidth: '600px', margin: "auto" }} >

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
            </main>

        </div>
    )
}

export default CreateCategory