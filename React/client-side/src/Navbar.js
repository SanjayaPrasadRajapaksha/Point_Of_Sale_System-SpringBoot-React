import React from 'react'
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsArrowLeftCircleFill  }
    from 'react-icons/bs'
import { Link } from 'react-router-dom'
function Navbar() {
    return (

        <header className='header navbar body'>

            <div className='header-left back-icon nIcon'>
                <Link to='/'>
                    <BsArrowLeftCircleFill  className='icon back-icon'/>
                </Link>
            </div>
            <div className='header-right back-icon nIcon'>
                <BsFillBellFill className='icon' />
                <BsFillEnvelopeFill className='icon' />
                <BsPersonCircle className='icon' />
            </div>
        </header>

    )
}

export default Navbar