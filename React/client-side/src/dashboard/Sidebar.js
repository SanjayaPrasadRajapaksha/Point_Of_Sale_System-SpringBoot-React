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

    }, [isAuthenticated])

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
                <Link to='/home' className='slideIcon'>
                    <li className='sidebar-list-item'>

                        <BsGrid1X2Fill className='icon' /> Dashboard

                    </li>
                </Link>
                <Link to='/orders' className='slideIcon'>
                    <li className='sidebar-list-item'>
                        <BsFillGiftFill className='icon' /> Orders
                    </li>
                </Link>
                <Link to='/products' className='slideIcon'>
                    <li className='sidebar-list-item'>

                        <BsFillArchiveFill className='icon' /> Products

                    </li>
                </Link>
                <Link to='/categories' className='slideIcon'>
                    <li className='sidebar-list-item'>

                        <BsFillGrid3X3GapFill className='icon' /> Categories

                    </li>
                </Link>
                <Link to='/customers' className='slideIcon'>
                    <li className='sidebar-list-item'>

                        <BsPeopleFill className='icon' /> Customers

                    </li>
                </Link>
                <Link to='/users' className='slideIcon'>
                    <li className='sidebar-list-item'>

                        <BsPersonCircle className='icon' /> Users

                    </li>
                </Link>
                <Link to='/' className='slideIcon'>
                    <li className='sidebar-list-item'>

                        <BsBoxArrowRight className='icon' /> Login



                    </li>
                </Link>
                {isAuthenticated &&
                    <Link to='/' className='slideIcon' onClick={logout}>
                        <li className='sidebar-list-item'>

                            <BsBoxArrowLeft className='icon' /> Logout

                        </li>
                    </Link>

                }

            </ul>
        </aside>

    )
}

export default Sidebar