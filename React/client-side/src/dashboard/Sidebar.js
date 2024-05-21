import React, { useEffect, useState } from 'react'
import {
    BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsBoxArrowRight, BsBoxArrowLeft, BsPersonCircle, BsFillGiftFill
} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import axios from 'axios';
function Sidebar({ openSidebarToggle, OpenSidebar }) {

    const { isAuthenticated, logout } = useAuth();

    const { jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    const [useimgUrl, setUseimgUrls] = useState('');

    useEffect(() => {

        axios.get(`http://localhost:8080/imagePreview/${1}`, config)
            .then(res => {
                setUseimgUrls(res.data.imageUrl)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            });

    },[isAuthenticated])

    return (


        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>

            <div className='sidebar-title'>
                <div className='sidebar-brand companyName'>
                    <div>
                        POS System
                    </div>
                    <br />
                    <div >
                        <img src={useimgUrl} alt="Uploaded" style={{ height: "80px", width: "80px", borderRadius: "100%" }} />
                    </div>

                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>


            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to='/' className='slideIcon'>
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </Link>
                </li>

                <li className='sidebar-list-item'>
                    <Link to='/orders' className='slideIcon'>
                        <BsFillGiftFill className='icon' /> Orders
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to='/products' className='slideIcon'>
                        <BsFillArchiveFill className='icon' /> Products
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to='/categories' className='slideIcon'>
                        <BsFillGrid3X3GapFill className='icon' /> Categories
                    </Link>
                </li>

                <li className='sidebar-list-item'>
                    <Link to='/customers' className='slideIcon'>
                        <BsPeopleFill className='icon' /> Customers
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to='/users' className='slideIcon'>
                        <BsPersonCircle className='icon' /> Users
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to='/login' className='slideIcon'>
                        <BsBoxArrowRight className='icon' /> Login


                    </Link>
                </li>
                {isAuthenticated &&
                    <li className='sidebar-list-item'>
                        <Link to='/login' className='slideIcon' onClick={logout}>
                            <BsBoxArrowLeft className='icon' /> Logout
                        </Link>

                    </li>

                }

            </ul>
        </aside>

    )
}

export default Sidebar