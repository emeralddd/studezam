import { Link } from "react-router-dom"
import LogoNav from "./LogoNav"

const NavbarUI = () => {
    const navlist = [
        {
            name:'Trang người dùng',
            href:'/'
        },
        {
            name:'Câu hỏi',
            href:'/questions'
        },
        {
            name:'Chuyên đề',
            href:'/thematics'
        },
        {
            name:'Dạng bài',
            href:'/tasks'
        },
        {
            name:'Bài giảng',
            href:'/lessons'
        }
    ]

    return (
        <>
            <LogoNav />

            <div className="mt-3 flex justify-around text-center">
                {
                    navlist.map(nav => (
                        <Link to={nav.href} key={nav.href} className="transition duration-200 border-2 border-transparent hover:border-b-orange-400 text-black">
                            {nav.name}
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default NavbarUI
