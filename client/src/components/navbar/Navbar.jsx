import "./navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { faBed, faCalendarDays, faPerson, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i18n from "../../i18n";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t } = useTranslation();

    const { user } = useContext(AuthContext)
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    const navigate = useNavigate()
    const {dispatch} = useContext(AuthContext)

    const handleTitle = () => {
        navigate("/", {state : {}})
    };

    const handleLogin = () => {
        dispatch({type:"LOGIN_START"})
        navigate("/login")
    };

    function myFunction() {
        document.getElementById("myDropdown3").classList.toggle("show3");
    }

    const handleOptionClick = (option) => {
        if(option == "login"){
            dispatch({type:"LOGIN_START"})
            navigate("/login", {state : true})
        }else if(option == "register"){
            dispatch({type:"LOGIN_START"})
            navigate("/login", {state : false})
        }else if(option == "profile"){
            navigate("/profile")
        }else if(option == "logout"){
            dispatch({type:"LOGOUT"})
            navigate("/")
        }
    }

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    return (
        <div className="navbar">
            <div className="navContainer">
                <span className="logo" onClick={handleTitle}>Stardust Lodge</span>
                <div className="navItems">
                {user ? (
                    <div className="dropdown3">
                    <button className="navButton" onClick={myFunction}>
                        {user.username}
                        <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: '10px' }} />
                    </button>
                    <button className="navButton" onClick={() => changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}>{t("navbar.english")}</button>

                    <div className="dropdown-content3" id="myDropdown3">
                        <a href="#" onClick={() => handleOptionClick('profile')}>{t("navbar.profile")}</a>
                        <a href="#" onClick={() => handleOptionClick('logout')}>{t("navbar.logout")}</a>
                    </div>
                    </div>
                ) : isLoginPage ? null : (
                    <div className="navItems">
                    <button className="navButton" onClick={() => handleOptionClick('register')}>{t("navbar.login")}</button>
                    <button className="navButton" onClick={() => handleOptionClick('login')}>{t("navbar.register")}</button>
                    <button className="navButton" onClick={() => changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}>{t("navbar.english")}</button>

                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default Navbar