import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { Redirect } from "react-router-dom"
import LoadingSpinner from "../components/items/LoadingSpinner"
import { DataContext } from "../contexts/dataContext"
import { apiURL } from "../utils/VariableName"

const Thematic = (props) => {

    const {
        thematicState: {thematics},
        getThematics
    } = useContext(DataContext)
    
    const [dataState,setData] = useState({
        loading: true,
        code:0,
        data: null
    })

    const find = async (tag) => {
        const found = await axios.get(`${apiURL}/public/getThematic/${tag}`)
        
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
            await getThematics()
            console.log(props.match.params.tag)
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

    if(props.match.path === '/thematics') {
        // console.log('abc')
        body = (
            <>
                <div className="py-10 text-4xl font-semibold text-center">
                    Chuyên đề
                </div>
                {
                    thematics.map(q => (
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
    } else {
        const tag = props.match.params.tag
        if(!tag) {
            return <Redirect to='/thematics' />
        }

        // console.log(dataState.data)

        body = (
            <>
                <div className="py-10 text-4xl font-semibold text-center">
                    Chuyên đề: {dataState.data.label}
                </div>
                {
                    dataState.data.questions.map(q => (
                        <a href={`/question/${q._id}`}>
                            <div className="shadow-sm p-6 my-3 flex flex-col justify-center">
                                <div className="text-lg font-medium">
                                    { q.question[0] === ' ' || q.question[0]==='#' ?
                                        <div dangerouslySetInnerHTML={{__html:q.choices.join(' ')}} />
                                    :
                                        <div dangerouslySetInnerHTML={{__html:q.question }}  />
                                    }
                                </div>
                                <div className="text-sm font-light">
                                    Mức độ khó: {q.difficulty}/4900
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

export default Thematic
