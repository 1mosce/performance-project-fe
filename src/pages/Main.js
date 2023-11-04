import { NavLink } from "react-router-dom";

// import './Main.css';

function Main() {

    return (
        <>
            <div>Main page</div>
            <div>
                <div><button><NavLink to="/Login">Login</NavLink></button></div>
                <div><button><NavLink to="/AboutUs">AboutUs</NavLink></button></div>
            </div>

        </>
    );
}

export default Main;