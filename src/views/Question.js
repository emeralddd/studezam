import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { Link, Redirect } from "react-router-dom"
import LoadingSpinner from "../components/items/LoadingSpinner"
import Footer from "../components/layout/Footer"
import NavbarUI from "../components/layout/NavbarUI"
import { DataContext } from "../contexts/dataContext"
import { apiURL } from "../utils/VariableName"

const Question = (props) => {

    const {
        questionState: {questions},
        getQuestions,
        getThematics,
        getTasks,
        stringThematics,
        stringTasks
    } = useContext(DataContext)
    
    const [dataState,setData] = useState({
        loading: true,
        code:0,
        data: null
    })

    const find = async (_id) => {
        const found = await axios.get(`${apiURL}/public/getQuestion/${_id}`)
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
            await getTasks()
            await getQuestions()
            if(props.match.params._id) {
                find(props.match.params._id)
            } else {
                setData({
                    loading:false
                })
            }
        }
        
        action()

    }, [])
    
    // console.log(stringTasks)

    if(dataState.loading) {
        return <LoadingSpinner />
    }

    let body = null

    if(props.match.path === '/questions') {
        body = (
            <>
                <div className="py-10 text-4xl font-semibold text-center">
                    Questions
                </div>
                {
                    questions.map(q => (
                        <a href={`/question/${q._id}`}>
                            <div className="shadow-sm p-6 my-3 flex flex-col justify-center">
                                <div className="text-lg font-medium">
                                    { q.question === ' ' || q.question[0]==='#' ?
                                        <div dangerouslySetInnerHTML={{__html:q.choices.join(' ')}} />
                                    :
                                        <div dangerouslySetInnerHTML={{__html:q.question }}  />
                                    }
                                </div>
                                <div className="text-sm font-light">
                                    Difficulty: {q.difficulty}/4900
                                </div>
                            </div>
                        </a>
                        
                    ))
                }
            </>
        )
    } else {
        const _id = props.match.params._id
        if(!_id) {
            return <Redirect to='/questions' />
        }

        const char = ['A', 'B', 'C', 'D']

        body = (
            <>
                <div className="py-10 text-4xl font-semibold text-center">
                    Question
                </div>

                <div className="shadow-sm p-6 my-3 flex flex-col justify-center">
                    <div className="text-lg font-light mb-2">
                        <div dangerouslySetInnerHTML={{__html:dataState.data.text }}  />
                    </div>

                    <div className="text-xl font-medium">
                        <div dangerouslySetInnerHTML={{__html:dataState.data.question }}  />
                    </div>
                    {
                        <div className="text-lg font-light">
                            {
                                dataState.data.choices.map((t,index) => (
                                    <div>
                                        {char[index]}. <span dangerouslySetInnerHTML={{__html:t }}  />

                                    </div>
                                ))
                            }
                        </div>
                    }

                    <hr className="my-2 border" />
                    <div className="text-sm font-light">
                        Dạng bài: {stringTasks[dataState.data.task]}
                    </div>

                    <div className="text-sm font-light">
                        Chuyên đề: {stringThematics[dataState.data.thematic]}
                    </div>

                    <div className="text-sm font-light">
                        Mức độ khó: {dataState.data.difficulty}/4900
                    </div>

                    <div className="text-sm font-light">
                        Nguồn: {dataState.data.source}
                    </div>
                </div>

                <div className="transition duration-200 shadow-sm p-6 my-3 flex flex-col justify-center bg-orange-400 text-orange-400 hover:bg-white hover:text-black">
                    <div className="text-xl font-medium">
                        Đáp án đúng: {char[dataState.data.answer-1]} {dataState.data.choices[dataState.data.answer-1]}
                    </div>
                    
                    <div className="text-lg font-light">
                        Giải thích: {dataState.data.explanation}
                    </div>
                </div>
                
            </>
        )
        

    }
    
    return (
        <>
            {body}
        </>
    )
}

export default Question
