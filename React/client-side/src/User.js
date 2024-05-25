import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { useAuth } from "./utils/AuthContext";
import Header from "./dashboard/Header";
import Sidebar from "./dashboard/Sidebar";


const User = () => {

    const [users, setUsers] = useState();
    const navigate = useNavigate()

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }


    useEffect(() => {
        axios.get('http://localhost:8080/users', config)

            .then(function (response) {
                setUsers(response.data)
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error)
            }, [isAuthenticated])
    })
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Header openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <main className='main-container' >
                <div class="main-card">

                    <h3 class="mb-0 pb-0 pb-md-0 mb-md-0">MANAGE USERS</h3>

                    <div className="text-right d-flex justify-content-end">
                        <button type="button" class="btn btn-primary" onClick={() => {
                            navigate('/users/createUser')
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
                                            <td>{<img src={user.imageUrl} alt="Uploaded" style={{ height: "50px", width: "50px", borderRadius: "100%" }} />}</td>
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
                                                    axios.delete(`http://localhost:8080/user/${user.id}`, config)
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
            </main>


        </div>

    )
}

export default User