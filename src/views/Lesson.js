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
                <div>
                    Lessons
                </div>
                {
                    lessons.map(q => (
                        <div>
                            <div>
                                Ten: {q.title}
                            </div>
                        </div>
                    ))
                }
            </>
        )
    } else {
        const tag = props.match.params.tag
        if(!tag) {
            return <Redirect to='/lessons' />
        }

        // console.log(dataState.data)

        body = (
            <>
                <div>
                    Lesson: {dataState.data.title}
                </div>
                
                <div>
                    Content: {dataState.data.content}
                </div>
                
            </>
        )
        

    }
    
    return (
        <>
            Hello
            {body}
        </>
    )
}

export default Lesson
