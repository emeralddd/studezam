import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Redirect, Route } from "react-router-dom"
import LoadingSpinner from "../components/items/LoadingSpinner"
import { apiURL } from "../utils/VariableName"
import Explanation from "../components/page/Explanation"
import InProgress from "../components/page/InProgress"
import { WaitingContest } from "../components/page/WaitingContest"
import FinishedContest from "../components/page/FinishedContest"
import PrintContest from "../components/page/PrintContest"

const Contest = (props) => {

    const [dataState,setData] = useState({
        loading: true,
        code:0,
        data: null,
        finish: false
    })

    const [chooseAnswer,setchooseAnswer] = useState([])

    const [counter, setCounter] = useState(-1)

    const submit = async () => {
        const response = await axios.post(`${apiURL}/user/submitContest`,{
            _id:dataState.data._id,
            submitedAnswer:chooseAnswer,
            type:dataState.data.type,
            contest:dataState.data
        })

        // console.log(response.data.success)

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

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
        return () => {
            clearInterval(timer)
            if(counter === 1) submit()
        }
    }, [counter])

    const find = async (tagor_id) => {
        try {
            const found = await axios.get(`${apiURL}/user/getContest/${tagor_id}`)

            setData({
                loading:false,
                code:200,
                data: found.data.payload,
                finish:false
            })

            let p=[]
            for(let i=0; i<found.data.payload.number; i++)
                p.push(0)

            setchooseAnswer(p)
        } catch(error) {
            console.log(error)

            setData({
                loading:false,
                code:404,
                data:error.message
            })
        }
    }

    const generate = async () => {
        const response = await axios.post(`${apiURL}/user/generateContest`)

        setData({
            loading:false,
            code:200,
            data: response.data.payload
        })
    }

    useEffect(() => {
        const action = async () => {
            const tagor_id = props.match.params.tagor_id
            if(tagor_id) {
                find(tagor_id)
            } else {
                generate()
            }
        }
        
        action()
    },[])
    
    // console.log(contests)

    if(dataState.loading) {
        return <LoadingSpinner />
    }

    if(dataState.code !== 200) {
        return (
            <Redirect to='/404' />
        )
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
        await submit()
	}

    const onClickCounter = async event => {
		event.preventDefault()
        setCounter(dataState.data.time*60)
	}

    if(props.match.path === '/contest/new') {
        body = (
            <Route render={() => window.location = `/contest/${dataState.data}`} />
        )
    } else if(props.match.path === '/contest/:tagor_id/explanation') {
        body = (
            <Explanation dataState={dataState} />
        )
    } else  if(props.match.path === '/contest/:tagor_id/print') {
        body = (
            <PrintContest dataState={dataState} />
        )
    } else {
        if(dataState.finish) {
            body = (
                <FinishedContest dataState={dataState} chooseAnswer={chooseAnswer} />
            )
        } else {
            if(counter === -1) {
                body = (
                    <WaitingContest dataState={dataState} onClickCounter={onClickCounter} tagor_id={props.match.params.tagor_id} />    
                )
            } else {
                body = (
                    <InProgress dataState={dataState} onSubmit={onSubmit} counter={counter} onChangeDataForm={onChangeDataForm} chooseAnswer={chooseAnswer} />
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
