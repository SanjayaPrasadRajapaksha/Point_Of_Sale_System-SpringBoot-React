import React, { useEffect, useState } from 'react'
import { BsPersonCircle }
    from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext';
import axios from 'axios';
function Navbar() {
    const { jwtToken, isAuthenticated } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    const [userEmail, setUserEmail] = useState('');


    useEffect(() => {

        axios.get(`http://localhost:8080/imagePreview/${1}`, config)
            .then(res => {
                setUserEmail(res.data.email)
            })
            .catch(err => {
                console.log(err)
            });

    }, [isAuthenticated])
    return (

        <header className='header navbar body'>

            <div className='header-left back-icon'>

                <Link to='/'>
                    <span className='navIcon'> Dashboard</span>

                </Link>

                &nbsp;&nbsp;
                <Link to='/orders'>
                    <span className='navIcon'>Orders</span>
                </Link>

                &nbsp;&nbsp;

                <Link to='/products'>
                    <span className='navIcon'>Products</span>
                </Link>

                &nbsp;&nbsp;
                <Link to='/categories'>
                    <span className='navIcon'>Categories</span>
                </Link>

                &nbsp;&nbsp;

                <Link to='/customers'>
                    <span className='navIcon'> Customers</span>
                </Link>

                &nbsp;&nbsp;

                <Link to='/customers'>
                    <span className='navIcon'> Users</span>
                </Link>

            </div>
            <div className='header-right back-icon nIcon'>
                <span className='emailFontColor'>{userEmail}</span>
                &nbsp; &nbsp;
                <BsPersonCircle className='icon' />
            </div>
        </header>

    )
}

export default Navbar