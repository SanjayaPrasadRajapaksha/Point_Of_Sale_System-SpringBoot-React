import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Category() {
    const [category, setCategory] = useState();
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('http://localhost:8080/categories')

            .then(function (response) {
                setCategory(response.data)
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error)
            }, [])
    })

    return (
        <div>
            <Navbar />
            <section class="vh-100 gradient-custom scroll">
                <div class="container h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-12 col-xl-12">
                            <div class="card shadow-lg card-registration rounded-15 " >
                                <div class="card-body p-4 p-md-5 scroll">
                                    <h3 class="mb-0 pb-0 pb-md-0 mb-md-0">MANAGE CATEGORIES</h3>
                                    <div className="text-right d-flex justify-content-end">
                                        <button type="button" class="btn btn-primary" onClick={() => {
                                            navigate('/createCategory')
                                        }}>Create Category</button>
                                    </div>
                                    <br />
                                    <table class="table table-striped">
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
                                                                    axios.delete(`http://localhost:8080/category/${category.category_id}`)
                                                                        .then(function (response) {

                                                                            setCategory();
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Category