import Footer from "../components/layout/Footer"
// import NavbarPrivate from "../components/layout/NavbarUI"
import Sidebar from "../components/layout/Sidebar"

const Admin = () => {
    return (
        <>
                
            <div className="page">
                {/* <NavbarPrivate /> */}
                <div className="dashboard">
                    <Sidebar page="dashboard"/>
                    <div className="content">
                        <p>Dashboard</p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Admin
