import { useContext, useEffect, useState } from "react"
import { DataContext } from "../contexts/dataContext"
import Toast from 'react-bootstrap/Toast'
import Select from "react-select"
import { mixed } from "../utils/SelectData"
import axios from "axios"
import { apiURL } from "../utils/VariableName"

const CustomFormat = (props) => {
    const {
        showDataToast: {
            show,
            message,
            type
        },
        setShowDataToast
    } = useContext(DataContext)

    const [newData, setNewData] = useState({
        time:0,
        thematics:[]
    })

    const [thematicc, setThematicc] = useState([])

    useEffect(() => {

    },[])

    const {time,thematics} = newData

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await axios.post(`${apiURL}/user/generateCustomFormat`,newData)
        setShowDataToast({ 
            show: true, 
            message, 
            type: success ? 'success' : 'danger' 
        })
		// if(success) resetNewData()
	}

    const onChangeDataForm = event => setNewData({ ...newData, [event.target.name]: event.target.value })

    const onChangeThematic = (pos,event) => {
        // console.log(event)
        const tmp = [...newData.thematics]
        const tmp1=[...thematicc]
        
        tmp[pos].thematic=event.value
        tmp1[pos]=event

        setNewData({ ...newData, thematic:tmp})
        setThematicc(tmp1)
    }

    const onChangeDifficulty = (pos1,pos2,event) => {
        const tmp = [...newData.thematics]

        tmp[pos1].difficulties[pos2].difficulty=Number(event.target.value)

        setNewData({ ...newData, task:tmp})
    }

    const onChangeDifficultyNumber = (pos1,pos2,event) => {
        const tmp = [...newData.thematics]

        tmp[pos1].difficulties[pos2].number=Number(event.target.value)

        setNewData({ ...newData, task:tmp})
    }

    const addThematic = () => {
        const tmp = [...newData.thematics]
        const tmp1 = [...thematicc]

        tmp.push({
            thematic:'',
            difficulties: []
        })

        tmp1.push(null)
        
        setNewData({ ...newData, thematics:tmp})
        setThematicc(tmp1)
    }

    const addDifficulty = (tid) => {
        const tmp = [...newData.thematics]

        tmp[tid].difficulties.push({
            difficulty:1000,
            number: 1
        })

        console.log(tmp)
        
        setNewData({ ...newData, thematics:tmp})
    }

    const deleteThematic = (tid) => {
        const tmp = [...newData.thematics]
        const tmp1 = [...thematicc]

        tmp.splice(tid,1)
        tmp1.splice(tid,1)
        
        setNewData({ ...newData, thematics:tmp})
        setThematicc(tmp1)
    }

    const deleteDifficulty = (tid,qid) => {
        const tmp = [...newData.thematics]

        tmp[tid].difficulties.splice(qid,1)
        
        setNewData({ ...newData, task:tmp})
    }

    const resetNewData = () => {
		setNewData({
            time:0,
            thematics:[]
        })
        setThematicc([])
	}

    return (
        <>
            <Toast
                show={show}
                style={{ 
                    position: 'fixed', 
                    top: '15%', 
                    right: '15px' 
                }}
                className={`bg-${type} text-white`}
                onClose={setShowDataToast.bind(this, {
                    show: false,
                    message: '',
                    type: null
                })}
                delay={2000}
                autohide
            >
                <Toast.Body>
                    <div className="font-semibold">{message}</div>
                </Toast.Body>
            </Toast>

            <div className="py-10 text-4xl font-semibold text-center">
                TẠO KỲ THI VỚI MA TRẬN RIÊNG
            </div>

            <div className='font-medium text-lg'>
                Thời gian
            </div>
            <input className="font-light border-2 w-full p-2 rounded-md" type='number' name='time' min='0' value={time} onChange={onChangeDataForm} />

            <div className='font-medium text-lg'>
                Chuyên đề
            </div>

            {
                thematics.map((t,i) => (
                    <div className="border-2 p-2 rounded-md my-3">
                        <button className="mb-2 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400" onClick={deleteThematic.bind(this,i)}>
                            Delete
                        </button>

                        <div className="font-medium">
                            Chuyên đề 
                        </div>
                        <Select
                            placeholder='Chọn chuyên đề'
                            options={mixed}
                            onChange={onChangeThematic.bind(this,i)}
                            value={thematicc[i]}
                        />

                        <div className="font-medium">
                            Mức độ 
                        </div>
                        
                        {
                            t.difficulties.map((d,j) => (
                                <div className="flex items-center my-2 gap-3">
                                    <div className="font-medium">
                                        Số câu hỏi
                                    </div>

                                    <input className="font-light border-2 p-2 rounded-md" type='number' min='1' max='50' value={d.number} onChange={onChangeDifficultyNumber.bind(this,i,j)} disabled={thematicc[i]==='docdientu'||thematicc[i]==='dochieudoanvan'?"true":"false"} />

                                    <div className="font-medium">
                                        Mức độ 
                                    </div>

                                    <input className="font-light border-2 p-2 rounded-md" type='number' min='1000' max='4000' step='1000' value={d.difficulty} onChange={onChangeDifficulty.bind(this,i,j)} />

                                    <button className="ml-3 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400" onClick={deleteDifficulty.bind(this,i,j)}>
                                        Delete
                                    </button>
                                </div>
                                
                            ))
                        }

                            <button className="mt-3 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400" onClick={addDifficulty.bind(this,i)} disabled={(thematicc[i]==='docdientu'||thematicc[i]==='dochieudoanvan')?"true":"false"}>
                                Thêm mức độ
                            </button>
                    </div>
                ))
            }

            <button className="my-3 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400" onClick={addThematic}>
                Add Task
            </button>

            <hr />
            
            <button className='my-3 p-2 rounded text-black border-2 border-orange-400 hover:bg-white bg-orange-400' type='submit' onClick={onSubmit}>
                Thêm
            </button>
        </>
    )
}

export default CustomFormat
