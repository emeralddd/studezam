import { createContext,useReducer,useState} from "react"
import { DataReducer } from '../reducer/dataReducer'
import { 
    ADD_CONTEST,
    ADD_LESSON,
    ADD_QUESTION,
    ADD_TASK,
    ADD_TEXT,
    ADD_THEMATIC,
    apiURL,
    CONTEST_LOADED_FAIL,
    CONTEST_LOADED_SUCCESS,
    DELETE_CONTEST,
    DELETE_LESSON,
    DELETE_QUESTION,
    DELETE_TASK,
    DELETE_TEXT,
    DELETE_THEMATIC,
    FIND_CONTEST,
    FIND_LESSON,
    FIND_QUESTION,
    FIND_TASK,
    FIND_TEXT,
    FIND_THEMATIC,
    LESSON_LOADED_FAIL,
    LESSON_LOADED_SUCCESS,
    QUESTION_LOADED_FAIL,
    QUESTION_LOADED_SUCCESS,
    TASK_LOADED_FAIL,
    TASK_LOADED_SUCCESS,
    TEXT_LOADED_FAIL,
    TEXT_LOADED_SUCCESS,
    THEMATIC_LOADED_FAIL,
    THEMATIC_LOADED_SUCCESS,
    UPDATE_CONTEST,
    UPDATE_LESSON,
    UPDATE_QUESTION,
    UPDATE_TASK,
    UPDATE_TEXT,
    UPDATE_THEMATIC
} from "../utils/VariableName"
import axios from "axios"

export const DataContext = createContext()

const DataContextProvider = ({children}) => {
    const [taskState,dispatchTask] = useReducer(DataReducer, {
        nowTask: {
            tag:'',
            label:''
        },
        tasks: [],
        taskLoading: true
    })

    const [thematicState,dispatchThematic] = useReducer(DataReducer, {
        nowThematic: {
            tag:'',
            label:'',
            task:''
        },
        thematics: [],
        thematicLoading: true
    })

    const [questionState,dispatchQuestion] = useReducer(DataReducer, {
        nowQuestion: {
            question:'',
            choices:[],
            answer:null,
            explanation:'',
            source:'',
            task:'',
            thematic:'',
            difficulty:0,
            text:'',
        },
        questions: [],
        questionLoading: true
    })

    const [lessonState,dispatchLesson] = useReducer(DataReducer, {
        nowLesson: {
            tag:'',
            title:'',
            content:'',
            dateCreated:null,
            user:''
        },
        lessons: [],
        lessonLoading: true
    })

    const [contestState,dispatchContest] = useReducer(DataReducer, {
        nowContest: {
            tag:'',
            title:'',
            time:'',
            difficulty:0,
            task:[]
        },
        contests: [],
        contestLoading: true
    })

    const [textState,dispatchText] = useReducer(DataReducer, {
        nowText: {
            text:'',
            source:'',
            task:'',
            number:0,
            difficulty:0
        },
        texts: [],
        textLoading: true
    })

    const [stringTasks,setStringTasks] = useState([])

    const [stringThematics,setStringThematics] = useState([])

    const [showDataUpdateModal, setShowDataUpdateModal] = useState(false)
	
	const [showDataToast, setShowDataToast] = useState({
		show: false,
		message: '',
		type: null
	})

    const getTasks = async () => {
        try {
            const response = await axios.get(`${apiURL}/public/getTasks`)

            if(response.data.success) {
                dispatchTask({
                    type: TASK_LOADED_SUCCESS,
                    payload: response.data.payload
                })
            }

            let tmp = []

            for(const i of response.data.payload) {
                tmp[i.tag]=i.label
            }

            setStringTasks(tmp)
        } catch (error) {
            console.log(error)
            dispatchTask({type: TASK_LOADED_FAIL})
        }
    }

    const updateTask = async (newData) => {
        try {
            const response = await axios.put(`${apiURL}/admin/updateTask`,newData)

            if(response.data.success) {
                dispatchTask({
                    type: UPDATE_TASK,
                    payload: response.data.payload
                })
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const findTask = async tag => {
        // console.log(tag)

        // console.log(taskState.tasks)

        const task = taskState.tasks.find(t => {
            return t.tag === tag
        })

        dispatchTask({
            type: FIND_TASK, 
            payload: task
        })

        // console.log(task)

        return task
    }

    const deleteTask = async tag => {
        try {
            const response = await axios.delete(`${apiURL}/admin/deleteTask`,tag)

            if(response.data.success) {
                dispatchTask({
                    type: DELETE_TASK,
                    payload: tag
                })
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const addTask = async newData => {
        try {
            const response = await axios.post(`${apiURL}/admin/addTask`,newData)

            if(response.data.success) {
                dispatchTask({
                    type: ADD_TASK,
                    payload: response.data.payload
                })
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const getQuestions = async () => {
        try {
            const response = await axios.get(`${apiURL}/public/getQuestions`)

            if(response.data.success) {
                dispatchQuestion({
                    type: QUESTION_LOADED_SUCCESS,
                    payload: response.data.payload
                })
            }
        } catch (error) {
            console.log(error)
            dispatchQuestion({type: QUESTION_LOADED_FAIL})
        }
    }

    const updateQuestion = async (newData) => {
        // console.log(newData)
        try {
            const response = await axios.put(`${apiURL}/teacher/updateQuestion`,newData)

            if(response.data.success) {
                dispatchQuestion({
                    type: UPDATE_QUESTION,
                    payload: response.data.payload
                })
            }

            return response.data
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const findQuestion = async _id => {
        const task = questionState.questions.find(t => {
            return t._id === _id
        })

        dispatchQuestion({
            type: FIND_QUESTION, 
            payload: task
        })

        // console.log(task)

        return task
    }

    const deleteQuestion = async _id => {
        try {
            // console.log(_id)
            const response = await axios.delete(`${apiURL}/teacher/deleteQuestion/${_id}`)
            // console.log(response)
            if(response.data.success) {
                dispatchQuestion({
                    type: DELETE_QUESTION,
                    payload: _id
                })
            }
        } catch (error) {
            // console.log(error)
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const addQuestion = async newData => {
        try {
            const response = await axios.post(`${apiURL}/teacher/addQuestion`,newData)

            if(response.data.success) {
                dispatchQuestion({
                    type: ADD_QUESTION,
                    payload: response.data.payload
                })
            }

            return response.data
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const getThematics = async () => {
        try {
            const response = await axios.get(`${apiURL}/public/getThematics`)

            if(response.data.success) {
                dispatchThematic({
                    type: THEMATIC_LOADED_SUCCESS,
                    payload: response.data.payload
                })
            }
            let tmp=[]
            for(const i of response.data.payload) {
                tmp[i.tag]=i.label
            }
            setStringThematics(tmp)
        } catch (error) {
            console.log(error)
            dispatchThematic({type: THEMATIC_LOADED_FAIL})
        }
    }

    const updateThematic = async (newData) => {
        try {
            const response = await axios.put(`${apiURL}/admin/updateThematic`,newData)

            if(response.data.success) {
                dispatchThematic({
                    type: UPDATE_THEMATIC,
                    payload: response.data.payload
                })
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const findThematic = async tag => {
        const task = thematicState.thematics.find(t => {
            return t.tag === tag
        })

        dispatchThematic({
            type: FIND_THEMATIC, 
            payload: task
        })

        // console.log(task)

        return task
    }

    const deleteThematic = async tag => {
        try {
            const response = await axios.delete(`${apiURL}/admin/deleteThematic`,tag)

            if(response.data.success) {
                dispatchThematic({
                    type: DELETE_THEMATIC,
                    payload: tag
                })
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const addThematic = async newData => {
        try {
            const response = await axios.post(`${apiURL}/admin/addThematic`,newData)

            if(response.data.success) {
                dispatchThematic({
                    type: ADD_THEMATIC,
                    payload: response.data.payload
                })
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const getLessons = async () => {
        try {
            const response = await axios.get(`${apiURL}/public/getLessons`)

            if(response.data.success) {
                dispatchLesson({
                    type: LESSON_LOADED_SUCCESS,
                    payload: response.data.payload
                })
            }
        } catch (error) {
            console.log(error)
            dispatchLesson({type: LESSON_LOADED_FAIL})
        }
    }

    const updateLesson = async (newData) => {
        try {
            const response = await axios.put(`${apiURL}/teacher/updateLesson`,newData)

            if(response.data.success) {
                dispatchLesson({
                    type: UPDATE_LESSON,
                    payload: response.data.payload
                })
            }

            return response.data
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const findLesson = async _id => {
        const task = lessonState.lessons.find(t => {
            return t._id === _id
        })

        dispatchLesson({
            type: FIND_LESSON, 
            payload: task
        })

        return task
    }

    const deleteLesson = async tag => {
        try {
            const response = await axios.delete(`${apiURL}/teacher/deleteLesson`,tag)

            if(response.data.success) {
                dispatchLesson({
                    type: DELETE_LESSON,
                    payload: tag
                })
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const addLesson = async newData => {
        try {
            const response = await axios.post(`${apiURL}/admin/addLesson`,newData)

            if(response.data.success) {
                dispatchLesson({
                    type: ADD_LESSON,
                    payload: response.data.payload
                })
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const getContests = async () => {
        try {
            const response = await axios.get(`${apiURL}/public/getContests`)

            if(response.data.success) {
                dispatchContest({
                    type: CONTEST_LOADED_SUCCESS,
                    payload: response.data.payload
                })
            }
        } catch (error) {
            console.log(error)
            dispatchContest({type: CONTEST_LOADED_FAIL})
        }
    }

    const updateContest = async (newData) => {
        try {
            const response = await axios.put(`${apiURL}/teacher/updateContest`,newData)

            if(response.data.success) {
                dispatchContest({
                    type: UPDATE_CONTEST,
                    payload: response.data.payload
                })
            }

            return response.data
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const findContest = async _id => {
        const task = contestState.contests.find(t => {
            return t._id === _id
        })

        // console.log(task)

        dispatchContest({
            type: FIND_CONTEST, 
            payload: task
        })

        return task
    }

    const deleteContest = async tag => {
        try {
            const response = await axios.delete(`${apiURL}/teacher/deleteContest`,tag)

            if(response.data.success) {
                dispatchContest({
                    type: DELETE_CONTEST,
                    payload: tag
                })
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const addContest = async newData => {
        try {
            const response = await axios.post(`${apiURL}/teacher/addContest`,newData)

            if(response.data.success) {
                dispatchContest({
                    type: ADD_CONTEST,
                    payload: response.data.payload
                })
            }

            return response.data
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const getTexts = async () => {
        try {
            const response = await axios.get(`${apiURL}/public/getTexts`)

            if(response.data.success) {
                dispatchText({
                    type: TEXT_LOADED_SUCCESS,
                    payload: response.data.payload
                })
            }
        } catch (error) {
            console.log(error)
            dispatchText({type: TEXT_LOADED_FAIL})
        }
    }

    const updateText = async (newData) => {
        try {
            const response = await axios.put(`${apiURL}/teacher/updateText`,newData)

            if(response.data.success) {
                dispatchText({
                    type: UPDATE_TEXT,
                    payload: response.data.payload
                })
            }

            return response.data
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const findText = async _id => {
        const task = textState.texts.find(t => {
            return t._id === _id
        })

        // console.log(task)

        dispatchText({
            type: FIND_TEXT, 
            payload: task
        })

        return task
    }

    const deleteText = async tag => {
        try {
            const response = await axios.delete(`${apiURL}/teacher/deleteText`,tag)

            if(response.data.success) {
                dispatchText({
                    type: DELETE_TEXT,
                    payload: tag
                })
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const addText = async newData => {
        try {
            const response = await axios.post(`${apiURL}/teacher/addText`,newData)

            if(response.data.success) {
                dispatchText({
                    type: ADD_TEXT,
                    payload: response.data.payload
                })
            }

            return response.data
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const DataContextData = {
        taskState,
        getTasks,
        updateTask,
        deleteTask,
        findTask,
        addTask,
        questionState,
        getQuestions,
        updateQuestion,
        deleteQuestion,
        findQuestion,
        addQuestion,
        thematicState,
        getThematics,
        updateThematic,
        deleteThematic,
        findThematic,
        addThematic,
        lessonState,
        getLessons,
        updateLesson,
        deleteLesson,
        findLesson,
        addLesson,
        contestState,
        getContests,
        updateContest,
        deleteContest,
        findContest,
        addContest,
        textState,
        getTexts,
        updateText,
        deleteText,
        findText,
        addText,
        stringTasks,
        stringThematics,
        showDataUpdateModal,
        setShowDataUpdateModal,
        showDataToast,
        setShowDataToast,
        
    }

    return (
        <DataContext.Provider value={DataContextData}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
