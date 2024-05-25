import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import { useAuth } from './utils/AuthContext';
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';

function EditCategory() {
    const [category_name, setCategory_name] = useState("");

    const { id } = useParams();

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {

        axios.get(`http://localhost:8080/category/${id}`, config)
            .then(response => {
                setCategory_name(response.data.category_name);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id, isAuthenticated]);

    function clearCategory() {
        setCategory_name("");
    }

    function updateCategory(event) {
        event.preventDefault();

        const data = {
            category_name: category_name,
        }

        axios.put(`http://localhost:8080/category/${id}`, data, config)
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
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <main class="main-container">
                <div class="main-card shadow  bg-white rounded" style={{ padding: "130px" }}>
                    <div className='text-right d-flex justify-content-between' style={{ borderRadius: '1rem', maxWidth: '600px', margin: "auto" }}>
                        <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Edit Category Form</h3>
                    </div>
                    <form onSubmit={updateCategory} id='updateUser' style={{ borderRadius: '1rem', maxWidth: '600px',margin : "auto" }}>

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
            </main>

        </div>
    )
}

export default EditCategory