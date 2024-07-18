import React from 'react'
import styled from 'styled-components'
import logo from '../../img/logo.png'
import { menuItems } from '../../utils/menuItems'

function Navigation({active, setActive}) {
    
    return (
        <NavStyled>
            <div className='logo'>
                <img src={logo} alt="" />
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: #F2F2F2;
    border: 2px solid #236DF6;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: .5rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

    .logo img {
        margin-top: 3rem;
        width: 330px;
        display: block; 
        justify-content: center;
    }
    .user-con {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center; /* Center horizontally */
        gap: 1rem;
    }
    
    .user-con img {
        width: 90px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
    }    
        h2{
            color: #000000;
            font-size: 1.4rem;
    }

    .menu-items{
        flex: 1;
        display: flex;
        margin-top: 3rem;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: #747474;
            padding-left: 1rem;
            position: relative;
            i{
                color: #747474;
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }
    .active{
        color: #236DF6 !important;
        i{
            color: #236DF6 !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #236DF6;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Navigation