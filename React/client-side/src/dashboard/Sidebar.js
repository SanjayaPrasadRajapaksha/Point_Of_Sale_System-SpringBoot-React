import React from 'react'
import {
    BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsBoxArrowRight, BsBoxArrowLeft, BsPersonCircle, BsFillGiftFill 
}
    from 'react-icons/bs'
import { Link } from 'react-router-dom'
function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (

        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand sName'>
                    POS System
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to='/'>
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </Link>

                </li>

                <li className='sidebar-list-item'>
                    <Link to='/orders'>
                        <BsFillGiftFill  className='icon' /> Orders
                    </Link>

                </li>
                <li className='sidebar-list-item'>
                    <Link to='/products'>
                        <BsFillArchiveFill className='icon' /> Products
                    </Link>

                </li>
                <li className='sidebar-list-item'>
                    <Link to='/categories'>
                        <BsFillGrid3X3GapFill className='icon' /> Categories
                    </Link>

                </li>

                <li className='sidebar-list-item'>
                    <Link to='/customers'>
                        <BsPeopleFill className='icon' /> Customers
                    </Link>

                </li>
                <li className='sidebar-list-item'>
                    <Link to='/users'>
                        <BsPersonCircle className='icon' /> Users
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to=''>
                        <BsBoxArrowRight className='icon' /> Login
                    </Link>

                </li>
                <li className='sidebar-list-item'>
                    <Link to=''>
                        <BsBoxArrowLeft className='icon' /> Logout
                    </Link>

                </li>

            </ul>
        </aside>

    )
}

export default Sidebar