import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { Redirect } from "react-router-dom"
import LoadingSpinner from "../components/items/LoadingSpinner"
import { DataContext } from "../contexts/dataContext"
import { apiURL } from "../utils/VariableName"

const Task = (props) => {

    const {
        taskState: {tasks},
        getTasks
    } = useContext(DataContext)
    
    const [dataState,setData] = useState({
        loading: true,
        code:0,
        data: null
    })

    const find = async (tag) => {
        const found = await axios.get(`${apiURL}/public/getTask/${tag}`)
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
            await getTasks()
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

    if(dataState.loading) {
        return <LoadingSpinner />
    }

    let body = null

    if(props.match.path === '/tasks') {
        // console.log('abc')
        body = (
            <>
                <div className="py-10 text-4xl font-semibold text-center">
                    Tasks
                </div>
                {
                    tasks.map(q => (
                        <a href={`/task/${q.tag}`}>
                            <div className="shadow-sm p-6 my-3 flex flex-col justify-center">
                                <div className="text-lg font-medium">
                                    {q.label}
                                </div>
                                <div className="text-sm font-light">
                                    Số chuyên đề: {q.thematics.length}
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
            return <Redirect to='/tasks' />
        }

        body = (
            <>
                <div className="py-10 text-4xl font-semibold text-center">
                    Task: {dataState.data.label}
                </div>
                {
                    dataState.data.thematics.map(q => (
                        <a href={`/thematic/${q.tag}`}>
                            <div className="shadow-sm p-6 my-3 flex flex-col justify-center">
                                <div className="text-lg font-medium">
                                    {q.label}
                                </div>
                            </div>
                        </a>
                        
                    ))
                }
            </>
        )
        

    }
    
    return (
        <>
            {body}
        </>
    )
}

export default Task
