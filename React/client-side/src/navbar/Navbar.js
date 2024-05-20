import React from 'react'
import { BsPersonCircle }
    from 'react-icons/bs'
import { Link } from 'react-router-dom'
function Navbar() {
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




            </div>
            <div className='header-right back-icon nIcon'>
                <BsPersonCircle className='icon' />
            </div>
        </header>

    )
}

export default Navbar