import Footer from '../components/layout/Footer'
import NavbarUI from '../components/layout/NavbarUI'

const NotFound = () => {
    return (
        <>
            <div className="flex justify-center">
                <div className="sm:w-[60rem]">
                    <NavbarUI />

                    <div className="text-6xl font-black text-center shadow-lg my-10 py-5">
                        404 - NOT FOUND
                    </div>

                    <Footer />
                </div>
            </div>
            
        </>
    )
}

export default NotFound