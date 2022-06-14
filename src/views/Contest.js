import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { Redirect } from "react-router-dom"
import LoadingSpinner from "../components/items/LoadingSpinner"
import { DataContext } from "../contexts/dataContext"
import { apiURL } from "../utils/VariableName"
import CROSS from '../assets/x-lg.svg'
import TICK from '../assets/check2.svg'
import ScrollToTop from "../components/routing/ScrollToTop"

const Contest = (props) => {

    const [dataState,setData] = useState({
        loading: true,
        code:0,
        data: null,
        finish: false
    })

    const [chooseAnswer,setchooseAnswer] = useState([])

    const find = async (tagor_id) => {
        const found = await axios.get(`${apiURL}/user/getContest/${tagor_id}`)
        
        // console.log(found)

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

        let p=[]
        for(let i=1; i<found.data.payload.number; i++)
            p.push(0)

        // console.log(p)

        setchooseAnswer(p)
    }

    useEffect(() => {
        const action = async () => {
            const tagor_id = props.match.params.tagor_id
            if(tagor_id) {
                find(tagor_id)
            } else {
                setData({
                    loading:false,
                    code:400,
                    data:null
                })
            }
        }

        // console.log('hello')
        
        action()
    }, [])
    
    // console.log(contests)

    if(dataState.loading) {
        return <LoadingSpinner />
    }

    // console.log(dataState)setNewData({ ...newData, [event.target.name]: event.target.value }

    const onChangeDataForm = event => {
        let tmp = chooseAnswer
        tmp[Number(event.target.name)]=Number(event.target.value)+1

        // console.log(tmp)

        // console.log(`Cau: ${Number(event.target.name)} thanh ${Number(event.target.id.split('-')[0])+1}`)

        setchooseAnswer([...tmp])

        // console.log(chooseAnswer)
    }
    
    let body = null

    const onSubmit = async event => {
		event.preventDefault()
		const response = await axios.post(`${apiURL}/user/submitContest`,{
            _id:dataState.data._id,
            submitedAnswer:chooseAnswer,
            type:dataState.data.type
        })
        
        // window.scrollTo(0, 0)


        // console.log(response)

        if(!response.data.success) {
            setData({
                loading:false,
                code:500,
                data:response.data.message,
                finish:true
            })
            return
        }

        setData({
            loading: false,
            code:200,
            data:response.data.payload,
            finish: true
        })

        
	}

    if(props.match.path === '/contest/new/:difficulty') {
        const difficulty = props.match.params.difficulty
        body = (
            <>
                <div>
                    Tao de moi
                    {difficulty}
                </div>
            </>
        )
    } else {
        const tagor_id = props.match.params.tagor_id

        const char = ['A', 'B', 'C', 'D']

        if(props.match.path === '/contest/:tagor_id/explanation') {
            body = (
                <>  
                    <div className="py-10 text-4xl font-semibold text-center">
                        Answer of {dataState.data.title}
                    </div>

                    {
                        dataState.data.task.map(t => (
                            <>
                                <div className="pt-10 text-xl font-semibold">
                                    {t.statement}
                                </div>

                                <div className="text-lg font-light mb-2">
                                    <div dangerouslySetInnerHTML={{__html:t.text }}  />
                                </div>

                                {
                                    t.questions.map(q => (
                                        <>
                                            <div className="text-lg font-medium pt-2">
                                                Question {q.index+1}. <span dangerouslySetInnerHTML={{__html:q.question }}  />
                                            </div>
                                            {
                                                <div className="text-lg font-light">
                                                    {
                                                        q.choices.map((t,index) => (
                                                            <div>
                                                                {char[index]}. <span dangerouslySetInnerHTML={{__html:t }}  />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            }
                                            <div className="text-lg">
                                                Answer: {char[q.answer-1]}
                                            </div>
                                            <div className="text-lg">
                                                Explanation: {q.explanation}
                                            </div>
                                        </>
                                    ))
                                }
                            </>
                        ))
                    }
                </>
            )
        } else {
            if(dataState.finish) {
                // document.getElementById("root").scroll(0,0)

                body = (
                    <>  
                        <div className="py-10 text-3xl font-semibold text-center">
                            {dataState.data.contestData.title}
                        </div>

                        <div className="shadow-lg p-6 my-3 flex flex-col justify-center text-center">
                            <div className="text-5xl font-medium">
                                Your score is
                            </div>
                            <div className="text-5xl font-semibold my-3">
                                {(dataState.data.correctAnswer*10.0/dataState.data.number).toFixed(1)}
                            </div>
                            <div className="text-xl">
                                {dataState.data.correctAnswer}/{dataState.data.number}
                            </div>
                        </div>

                        {
                            dataState.data.contestData.task.map(t => (
                                <>
                                    <div className="pt-10 text-xl font-semibold">
                                        {t.statement}
                                    </div>

                                    <div className="text-lg font-light mb-2">
                                        <div dangerouslySetInnerHTML={{__html:t.text }}  />
                                    </div>

                                    {
                                        t.questions.map(q => (
                                            <>
                                                <div className="text-lg font-medium pt-2">
                                                    Question {q.index}. <span dangerouslySetInnerHTML={{__html:q.question }}  />
                                                </div>
                                                
                                                <div className="text-lg font-light">
                                                    {
                                                        q.choices.map((t,index) => (
                                                            chooseAnswer[q.index-1] === index+1 ? (
                                                                <div className="font-bold flex">
                                                                    {
                                                                        (chooseAnswer[q.index-1] === q.answer) ? (
                                                                            <>
                                                                                <div className="text-green-500">
                                                                                    {char[index]}. <span dangerouslySetInnerHTML={{__html:t }}  /> 
                                                                                </div>
                                                                                <img src={TICK} className='ml-1 w-4 h-auto' />
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <div className="text-red-500">
                                                                                    {char[index]}. <span dangerouslySetInnerHTML={{__html:t }}  />
                                                                                </div>
                                                                                <img src={CROSS} className='ml-1 w-4 h-auto' />
                                                                            </>
                                                                            
                                                                        )
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    {char[index]}. <span dangerouslySetInnerHTML={{__html:t }}  />
                                                                </div>
                                                            )
                                                        ))
                                                    }
                                                </div>
                                                
                                                <div className="shadow-sm my-2">
                                                    <div className="p-2">
                                                        {
                                                            chooseAnswer[q.index-1] === q.answer ? (
                                                                <>
                                                                    <div>
                                                                        Explanation: {q.explanation}
                                                                    </div>
                                                                </>
                                                                    
                                                            ) : (
                                                                <>
                                                                    <div className="font-bold">
                                                                        Correct Answer: {char[q.answer-1]}
                                                                    </div>
                                                                    <div>
                                                                        Explanation: {q.explanation}
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </div>

                                                </div>
                                                
                                            </>
                                        ))
                                    }
                                </>
                            ))
                        }
                        <button type='button' className='transition duration-200 shadow-xl border px-4 py-2 text-center font-bold text-lg'>
                            <a href="#top" className="text-black">
                                Xem điểm
                            </a>
                        </button>

                    </>
                )
            } else {
                // console.log('ren')
                body = (
                    <div className="">  
                        <div>
                            <div className="py-10 text-4xl font-semibold text-center">
                                {dataState.data.title}
                            </div>

                            {
                                dataState.data.task.map(t => (
                                    <>
                                        <div className="pt-10 text-xl font-semibold">
                                            {t.statement}
                                        </div>

                                        <div className="text-lg font-light mb-2">
                                            <div dangerouslySetInnerHTML={{__html:t.text }}  />
                                        </div>

                                        {
                                            t.questions.map(q => (
                                                <>
                                                    <a name={q.index}>
                                                    </a>
                                                    <div className="text-lg font-medium pt-2">
                                                        Question {q.index+1}. <span dangerouslySetInnerHTML={{__html:q.question }}  />
                                                    </div>
                                
                                                    <div className="text-lg font-light">
                                                        {
                                                            q.choices.map((t,index) => (
                                                                <div>
                                                                    <input type="radio" name={q.index} value={index} id={`${index}-${q.index}`} onChange={onChangeDataForm} className='h-3 bg-orange-400' />
                                                                    <label className='ml-2' htmlFor={`${index}-${q.index}`}>
                                                                        {char[index]}. <span dangerouslySetInnerHTML={{__html:t }}  />
                                                                    </label>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    
                                                </>
                                            ))
                                        }
                                    </>
                                ))
                            }

                            <button type='button' onClick={onSubmit} className='transition duration-200 shadow-xl border px-4 py-2 text-center font-bold text-lg'>
                                Submit
                            </button>
                        </div>
                        <div className="transition-[width_3s] w-24 hover:w-80 border-orange-400 border-y-2 border-l-2 fixed top-10 right-0 bottom-10 bg-white p-4 overflow-y-auto group ">
                            <div className="group-hover:flex flex-wrap gap-2 justify-center hidden">
                                {
                                    //Array(dataState.data.number-1)
                                    [...Array(dataState.data.number-1)].map((e, i) => 
                                        <a href={`#${i}`} className={`flex text-center w-10 p-2 ${chooseAnswer[i]===0?`bg-orange-400`:`bg-orange-600`} content-center rounded-lg`}>
                                            <div className="text-white font-bold align-middle text-lg">
                                                {i+1<10?'0':''}{i+1}
                                                {/* {chooseAnswer[i]} */}
                                            </div>
                                            
                                        </a>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                )
            }
            
        }

    }
    
    return (
        <>
            {body}
        </>
    )
}

export default Contest
