import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import { useAuth } from './utils/AuthContext';
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';

function Category() {
    const [category, setCategory] = useState();
    const navigate = useNavigate()

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        axios.get('http://localhost:8080/categories', config)

            .then(function (response) {
                setCategory(response.data)
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error)
            })
    }, [isAuthenticated])

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <main className='main-container'>
                <div class="main-card">
                    <h3 class="mb-0 pb-0 pb-md-0 mb-md-0">MANAGE CATEGORIES</h3>
                    <div className="text-right d-flex justify-content-end">
                        <button type="button" class="btn btn-primary" onClick={() => {
                            navigate('/categories/createCategory')
                        }}>Create Category</button>
                    </div>
                    <br />
                    <table class="table table-warning">
                        <thead>
                            <tr className='text-center'>
                                <th>#</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                category && category.map(category => {
                                    return (
                                        <tr className='text-center'>
                                            <td>{category.category_id}</td>
                                            <td>{category.category_name}</td>
                                            <td>
                                                <button type='button' className='btn btn-success' onClick={() => {
                                                    navigate(`/categories/${category.category_id}/editCategory`)
                                                }}>Edit</button>

                                                &nbsp;
                                                &nbsp;
                                                <button className='btn btn-danger' onClick={() => {
                                                    axios.delete(`http://localhost:8080/category/${category.category_id}`, config)
                                                        .then(function (response) {
                                                            axios.get('http://localhost:8080/categories', config)

                                                                .then(function (response) {
                                                                    setCategory(response.data)
                                                                    console.log(response.data)

                                                                })
                                                                .catch(function (error) {
                                                                    console.log(error)
                                                                })

                                                        })
                                                        .catch(function (error) {
                                                            console.log(error)
                                                        })
                                                }}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </main>

        </div>
    )
}

export default Category