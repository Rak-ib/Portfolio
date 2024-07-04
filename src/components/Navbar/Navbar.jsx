import logo from "../../assets/assets/kevinRushLogo.png"
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
const Navbar = () => {
    return (
        <div className="navbar ">
            <div className="flex-1">
                {/* <a className="btn btn-ghost text-xl">{logo}</a> */}
                <img src={logo} alt="" />
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 gap-10 align-middle text-2xl items-center justify-center">
                <FaLinkedin />
                <FaGithub />
                <FaSquareFacebook />
                <FaInstagram />
                    {/* <li><a><FaGithub/></a></li> */}
                    {/* <li><a><FaSquareXTwitter/></a></li> */}
                    {/* <li><a><FaInstagram/></a></li> */}
                    
                </ul>
            </div>
        </div>
    );
};

export default Navbar;