import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate()

    const handleTitle = () => {
        navigate("/", {state : {}})
    };

    return (
        <div className="navbar">
            <div className="navContainer">
                <span className="logo" onClick={handleTitle}>Stardust Lodge</span>
                <div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar