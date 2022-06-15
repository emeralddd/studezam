import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import LoadingSpinner from '../components/items/LoadingSpinner'
import Footer from '../components/layout/Footer'
import NavbarUI from '../components/layout/NavbarUI'
import { DataContext } from '../contexts/dataContext'

const Homepage = () => {
    const {
        contestState: {contests},
        getContests
    } = useContext(DataContext)

    const [dataState,setData] = useState(5)

    useEffect(() => {
        const action = async () => {
            await getContests()
        }
        
        action()
    }, [])

    // console.log(contests)

    const onChangeDataForm = event => {
        setData(event.target.value)
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="sm:w-[60rem]">
                    <NavbarUI />

                    <div className="py-16">
                        <div className="shadow-xl p-6 flex flex-col justify-center items-center">
                            <div className="text-4xl font-semibold">
                                TẠO ĐỀ TỰ ĐỘNG
                            </div>

                            <div className="text-2xl font-medium mt-10">
                                <input type="range" value={dataState} min="0" max="9" className="w-40 h-2 rounded-lg appearance-none cursor-pointer border-orange-400 border-2" onChange={onChangeDataForm} />
                            </div>

                            <div className='font-light mb-10'>
                                Độ khó: {dataState*100}/900
                            </div>

                            <div className="">
                                <a href={`/contest/new/${dataState*100}`}>
                                    <div className="shadow py-4 px-7 w-fit bg-orange-400 text-white border-2 text-3xl font-bold">
                                        TẠO ĐỀ NGAY
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
                                <div className="flex sm:flex-row flex-col my-5">
                                    <img className="object-cover h-44 w-64" src='https://s3-alpha-sig.figma.com/img/68bc/291c/6c27f69839cbc92c584cb5b4c8cea925?Expires=1655683200&Signature=LSUc0axazC1YxqaTn5-lodG5fEoVF-wZe-AW0GIeMQvf9z9YvqPNExvwdPBbsxAnKpDFmnLqbQafSjCSpJMKxLBXx4Cf1rrsFEvylCSJw9gbfWBfFgZgSyxqLO5SuhIDk4q9JA1CX3C29h1a1NfgAoUL5VTiFIArCt5a-4IRQRn8nw0AdsUG9RpvmDmF3l~nEj0luGFHNHQwSOch5p5kJFxkK6Rvof8nc0OpqwI253i01kCbCUCb6wjyECtX7iPk5hVR6v1IuEuioYfdiEPkmTatqWSRFTE8rnt9-wC4WtAn~ZtmP-zc2FVx84JhloYqlBTC7OHJh0urvoa2QhbujQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'/>
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
                                        <div className="text-lg font-medium">
                                            Độ khó: {c.difficulty}/900
                                        </div>

                                        <div className='flex mt-2'>
                                            <Link to={`/contest/${c.tag}`}>
                                                <div class="shadow py-2 px-3 w-fit text-orange-400 hover:bg-orange-400 hover:text-white border-2 font-bold">
                                                    Thi thử
                                                </div>
                                            </Link>

                                            <Link to={`/contest/${c.tag}/explanation`}>
                                                <div class="shadow py-2 px-3 w-fit text-orange-400 hover:bg-orange-400 hover:text-white border-2 font-bold ml-2">
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