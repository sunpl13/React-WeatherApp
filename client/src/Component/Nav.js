import React from 'react'
import {Link} from 'react-router-dom'
import '../Scss/nav.scss'

function Nav() {

    const navStyle = {
        textDecoration : 'none',
        color : 'black',
        margin : '30px'
    }

    return (
        <nav>
            <Link style = {navStyle} to = '/weather'> 날씨 정보</Link>
            <Link style = {navStyle} to ='/calendar'>캘린더</Link>
        </nav>
    )
}

export default Nav
