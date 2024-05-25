import React, { useEffect, useState } from 'react'
import { BsPersonCircle, BsJustify }
    from 'react-icons/bs'
import { useAuth } from '../utils/AuthContext';
import axios from 'axios';
function Header({ OpenSidebar }) {
    const [currentDate, setCurrentDate] = useState(new Date());

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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formattedDate = currentDate.toLocaleString();
    return (
        <header className='header shadow-lg'>
            <div className='menu-icon'>
                <BsJustify className='icon' onClick={OpenSidebar} />
            </div>

            <div className='header-left'>
                <span className='dateTime '>{formattedDate}</span>
            </div>
            <div className='header-right'>
                <span className='emailFontColor'>{userEmail}</span>
                &nbsp; &nbsp;
                <BsPersonCircle className='icon' />
            </div>
        </header>



    )
}

export default Header