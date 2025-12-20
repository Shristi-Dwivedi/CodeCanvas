import React, { useState } from 'react'
import "./Sidebar.css"
import { FaHome, FaBars , FaCode , FaBookOpen , FaLock} from "react-icons/fa";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
                <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                    <FaBars />
                </button>

                <nav className="menu">
                    <a href="/dashboard" className="menu-item">
                        <FaHome />
                        {isOpen && <span>Dashboard</span>}
                    </a>
                    <a href="/dashboard/editor" className="menu-item">
                        <FaCode />
                        {isOpen && <span>Coding Corner</span>}
                    </a>
                    <a href="/dashboard/tutorials" className="menu-item">
                        <FaBookOpen />
                        {isOpen && <span>Learning Corner</span>}
                    </a>
                    <a href="/" className="menu-item footer-menu-item">
                        <FaLock />
                        {isOpen && <span>Log Out</span>}
                    </a>
                </nav>
            </div>
        </>
    )
}

export default Sidebar