import { Link, Redirect } from "react-router-dom"
import Footer from "../components/layout/Footer"
import Sidebar from "../components/layout/Sidebar"
import ContestsManager from "../teacher/ContestsManager"
import LessonsManager from "../teacher/LessonsManager"
import QuestionsManager from "../teacher/QuestionsManager"
import TextsManager from "../teacher/TextsManager"

const Teacher = (props) => {
    // console.log(props)

    let body = null
    // console.log(props.match.path)
    if(props.match.path==='/teacher') {
        // console.log('abc')
        body = (
            <>
                <div className="text-4xl font-extrabold text-center mt-5">
                    Giáo Viên
                </div>
                <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 my-5 gap-2">
                    <Link to='/teacher/questionsmanager'>
                        <div className="transition duration-300 col-start-1 row-start-1 font-bold text-3xl border-2 border-orange-400 hover:border-white hover:bg-orange-400 hover:text-white p-4 text-center">
                            Quản lý Câu hỏi
                        </div>
                    </Link>
                    <Link to='/teacher/textsmanager'>
                        <div className="transition duration-300 col-start-1 row-start-2 font-bold text-3xl border-2 border-orange-400 hover:border-white hover:bg-orange-400 hover:text-white p-4 text-center">
                            Quản lý Đoạn văn
                        </div>
                    </Link>
                    <Link to='/teacher/contestsmanager'>
                        <div className="transition duration-300 col-start-1 row-start-3 md:col-start-2 md:row-start-1 font-bold text-3xl border-2 border-orange-400 hover:border-white hover:bg-orange-400 hover:text-white p-4 text-center">
                            Quản lý Kỳ thi
                        </div>
                    </Link>
                    <Link to='/teacher/lessonsmanager'>
                        <div className="transition duration-300 col-start-1 row-start-4 md:col-start-2 md:row-start-2 font-bold text-3xl border-2 border-orange-400 hover:border-white hover:bg-orange-400 hover:text-white p-4 text-center">
                            Quản lý Bài giảng
                        </div>
                    </Link>
                    
                </div>
            </>
        )
    } else {
        // console.log(props.match.params.action)
        
        if(props.match.params.action === 'questionsmanager') 
            body = (<QuestionsManager {...props} />)
        else if(props.match.params.action === 'lessonsmanager') 
            body = (<LessonsManager {...props} />)
        else if(props.match.params.action === 'contestsmanager') 
            body = (<ContestsManager {...props} />)
        else if(props.match.params.action === 'textsmanager') 
            body = (<TextsManager {...props} />)
        else
            body = (<Redirect to='/404' />)
    }

    return (
        <>
            {body}
        </>
    )
}

export default Teacher
