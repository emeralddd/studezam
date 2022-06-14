import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { Redirect } from "react-router-dom"
import LoadingSpinner from "../components/items/LoadingSpinner"
import { DataContext } from "../contexts/dataContext"
import { apiURL } from "../utils/VariableName"

const Lesson = (props) => {

    const {
        lessonState: {lessons},
        getLessons
    } = useContext(DataContext)
    
    const [dataState,setData] = useState({
        loading: true,
        code:0,
        data: null
    })

    const find = async (tag) => {
        const found = await axios.get(`${apiURL}/public/getLesson/${tag}`)
        
        if(!found.data.success) {
            setData({
                loading:false,
                code:404,
                data:null
            })
            return
        }

        setData({
            loading:false,
            code:200,
            data: found.data.payload
        })
    }

    useEffect(() => {
        const action = async () => {
            await getLessons()
            // console.log(props.match.params.tag)
            if(props.match.params.tag) {
                find(props.match.params.tag)
            } else {
                setData({
                    loading:false
                })
            }
        }
        
        action()

    }, [])
    
    // console.log(tasks)

    if(dataState.loading) {
        return <LoadingSpinner />
    }

    // console.log(dataState)

    let body = null

    if(props.match.path === '/lessons') {
        // console.log('abc')
        body = (
            <>
                <div className="py-10 text-4xl font-semibold text-center">
                    Lessons
                </div>
                {
                    lessons.map(q => (
                        <a href={`/lesson/${q.tag}`}>
                            <div className="shadow-sm p-6 my-3 flex flex-col justify-center">
                                <div className="text-lg font-medium">
                                    {q.title}
                                </div>
                                <div className="text-sm font-light">
                                    {q.content.slice(0,200)} ...
                                </div>
                            </div>
                        </a>
                    ))
                }
            </>
        )
    } else {
        const tag = props.match.params.tag
        if(!tag) {
            return <Redirect to='/lessons' />
        }

        body = (
            <>
                <div className="py-10 text-4xl font-semibold text-center">
                    Lesson: {dataState.data.title}
                </div>

                <div className="text-sm font-light text-center pb-20">
                    Bởi: {dataState.data.user.username} lúc {dataState.data.dateCreated}
                </div>
                
                <div dangerouslySetInnerHTML={{__html:dataState.data.content}} />
            </>
        )
        

    }
    
    return (
        <>
            {body}
        </>
    )
}

export default Lesson
