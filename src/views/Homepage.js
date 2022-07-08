import { useEffect } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import NavbarUI from '../components/layout/NavbarUI'
import { DataContext } from '../contexts/dataContext'

const Homepage = () => {
    const {
        contestState: {contests},
        getContests
    } = useContext(DataContext)

    useEffect(() => {
        const action = async () => {
            await getContests()
        }
        
        action()
    },[])

    return (
        <>
            <div className="flex justify-center">
                <div className="sm:w-[60rem]">
                    <NavbarUI />

                    <div className="py-16">
                        <div className="shadow-xl p-6 flex flex-col justify-center items-center">
                            <div className="text-4xl font-semibold mb-10">
                                TẠO ĐỀ TỰ ĐỘNG
                            </div>

                            <div className="flex gap-3 justify-center items-center w-full">
                                <a href={`/contest/new`} className='flex-1'>
                                    <div className="shadow py-4 px-7 bg-orange-400 text-white border-2 text-3xl font-bold text-center">
                                        TẠO ĐỀ NGAY
                                    </div>
                                </a>

                                <a href={`/customformat`} className='flex-1'>
                                    <div className="shadow py-4 px-7 text-orange-400 bg-white border-2 border-orange-400 text-3xl font-bold text-center">
                                        MA TRẬN KHÁC?
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="py-16">
                        <div className="text-4xl font-semibold">
                            Đề thi gần đây
                        </div>

                        {
                            contests.map(c => {
                                
                                let num = 0

                                for(const i of c.task) {
                                    num+=i.questions.length
                                }

                                return (
                                <div className="flex sm:flex-row flex-col my-5" key={c.title}>
                                    <img className="object-cover h-44 w-64" src='https://t3.ftcdn.net/jpg/03/43/43/72/360_F_343437244_HrxIVZWbfh29tgxuRlxbPXEpHMSmfkAn.jpg' alt='contest' />
                                    <div className="flex flex-col justify-center pl-4">
                                        <div className="text-2xl font-bold">
                                            {c.title}
                                        </div>
                                        <div className="text-lg font-medium">
                                            Số câu hỏi: {num}
                                        </div>
                                        <div className="text-lg font-medium">
                                            Thời gian: {c.time} phút
                                        </div>

                                        <div className='flex mt-2'>
                                            <Link to={`/contest/${c.tag}`}>
                                                <div className="shadow py-2 px-3 w-fit text-orange-400 hover:bg-orange-400 hover:text-white border-2 font-bold">
                                                    Thi thử
                                                </div>
                                            </Link>

                                            <Link to={`/contest/${c.tag}/explanation`}>
                                                <div className="shadow py-2 px-3 w-fit text-orange-400 hover:bg-orange-400 hover:text-white border-2 font-bold ml-2">
                                                    Xem hướng dẫn
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )})
                        }
                    </div>

                    <Footer />
                </div>
            </div>
            
        </>
    )
}

export default Homepage