import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <Navbar />
            <main className="main-content">
                <Outlet /></main>        </>
    );
}

export default Layout;