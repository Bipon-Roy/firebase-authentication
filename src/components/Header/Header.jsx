import { Link } from "react-router-dom";

const Header = () => {
    const links = (
        <>
            <li className="mr-5 text-base">
                <Link to="/">Home</Link>
            </li>
            <li className="mr-5 text-base">
                <Link to="/login">Authentication</Link>
            </li>
            <li className="mr-5 text-base">
                <Link to="/signin">Sign In</Link>
            </li>
            <li className="mr-5 text-base">
                <Link to="/register">Register</Link>
            </li>
            <li className="mr-5 text-base">
                <Link to="/HeroRegister">Hero Register</Link>
            </li>
        </>
    );
    return (
        <div className="my-4">
            <div className="navbar bg-base-100 px-0">
                <div className="flex-1">
                    <p className=" normal-case text-2xl font-semibold">Firebase With React</p>
                </div>
                <div className="flex-none ">
                    <ul className="menu menu-horizontal px-1 ">{links}</ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
