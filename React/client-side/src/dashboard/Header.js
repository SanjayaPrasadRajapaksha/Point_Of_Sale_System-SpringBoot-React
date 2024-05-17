import React, { useEffect, useState } from 'react'
import { BsPersonCircle, BsJustify }
    from 'react-icons/bs'
function Header({ OpenSidebar }) {
    const [currentDate, setCurrentDate] = useState(new Date());

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
                <BsPersonCircle className='icon' />
            </div>
        </header>



    )
}

export default Header