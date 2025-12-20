import React from 'react'
import "./CommonNavbar.css"

const CommonNavbar = () => {
    return (
        <div className='navbar_cnt'>
            <div className='navbox'>
                <p className='navhead'>CodeCanvas</p>
                <a href='/dashboard/learning-history' className='nav_learnstat'>LEARNING HISTORY</a>
                <a href='/dashboard/test-history' className='nav_codestat'>TEST HISTORY</a>
                <a href='/dashboard/editor' className='nav_ide'>WORK ON IDE</a>
                <a href='/dashboard/test' className='nav_test'>TEST YOURSELF !</a>
            </div>
        </div>
    )
}

export default CommonNavbar