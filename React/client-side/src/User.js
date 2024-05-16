import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


const User = () => {

    const [users, setUsers] = useState();
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('http://localhost:8080/users')

            .then(function (response) {
                setUsers(response.data)
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
                            <div class="card shadow-lg card-registration rounded-15" >
                                <div class="card-body p-4 p-md-5">

                                    <h3 class="mb-0 pb-0 pb-md-0 mb-md-0">MANAGE USERS</h3>

                                    <div className="text-right d-flex justify-content-end">
                                        <button type="button" class="btn btn-primary" onClick={() => {
                                            navigate('/createUser')
                                        }}>Create User</button>
                                    </div>
                                    <br />
                                    <table class="table table-warning">
                                        <thead>
                                            <tr className='text-center'>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Contact</th>
                                                <th>Address</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                users && users.map(user => {
                                                    return (
                                                        <tr className='text-center'>
                                                            <td>{<img src={user.imageUrl} alt="Uploaded" style={{height: "50px", width:"50px", borderRadius: "100%" }} />}</td>
                                                            <td>{user.username}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.phone}</td>
                                                            <td>{user.address}</td>
                                                            <td>
                                                                <button type='button' className='btn btn-success' onClick={() => {
                                                                    navigate(`/users/${user.id}/editUser`)
                                                                }}>Edit</button>
                                                                &nbsp;
                                                                &nbsp;
                                                                <button className='btn btn-danger' onClick={() => {
                                                                    axios.delete(`http://localhost:8080/user/${user.id}`)
                                                                        .then(function (response) {

                                                                            setUsers();
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

export default User