import { createContext,useReducer,useState} from "react"
import { DataReducer } from '../reducer/dataReducer'
import { 
    ADD_CONTEST,
    ADD_LESSON,
    ADD_QUESTION,
    ADD_TASK,
    ADD_THEMATIC,
    apiURL,
    CONTEST_LOADED_FAIL,
    CONTEST_LOADED_SUCCESS,
    DELETE_CONTEST,
    DELETE_LESSON,
    DELETE_TASK,
    DELETE_THEMATIC,
    FIND_CONTEST,
    FIND_LESSON,
    FIND_QUESTION,
    FIND_TASK,
    FIND_THEMATIC,
    LESSON_LOADED_FAIL,
    LESSON_LOADED_SUCCESS,
    QUESTION_LOADED_FAIL,
    QUESTION_LOADED_SUCCESS,
    TASK_LOADED_FAIL,
    TASK_LOADED_SUCCESS,
    THEMATIC_LOADED_FAIL,
    THEMATIC_LOADED_SUCCESS,
    UPDATE_CONTEST,
    UPDATE_LESSON,
    UPDATE_QUESTION,
    UPDATE_TASK,
    UPDATE_THEMATIC
} from "../utils/VariableName"
import axios from "axios"

export const DataContext = createContext()

const DataContextProvider = ({children}) => {
    const [taskState,dispatchTask] = useReducer(DataReducer, {
        nowTask: {
            tag:'',
            label:'',
            thematics:[]
        },
        tasks: [],
        taskLoading: true
    })

    const [thematicState,dispatchThematic] = useReducer(DataReducer, {
        nowThematic: {
            tag:'',
            label:'',
            questions:[],
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

    const [stringTasks,setStringTasks] = useState([])

    const [stringThematics,setStringThematics] = useState([])

    const [showMemberUpdateModal, setShowMemberUpdateModal] = useState(false)
	
	const [showMemberToast, setShowMemberToast] = useState({
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
        try {
            const response = await axios.put(`${apiURL}/teacher/updateQuestion`,newData)

            if(response.data.success) {
                dispatchQuestion({
                    type: UPDATE_QUESTION,
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
            const response = await axios.delete(`${apiURL}/teacher/deleteQuestion`,_id)

            if(response.data.success) {
                dispatchQuestion({
                    type: DELETE_TASK,
                    payload: _id
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

    const addQuestion = async newData => {
        try {
            const response = await axios.post(`${apiURL}/admin/addQuestion`,newData)

            if(response.data.success) {
                dispatchQuestion({
                    type: ADD_QUESTION,
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

            // console.log(response.data)

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
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const findLesson = async tag => {
        const task = lessonState.lessons.find(t => {
            return t.tag === tag
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
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const findContest = async tag => {
        console.log(tag)

        console.log(contestState.contests)

        const task = contestState.contests.find(t => {
            return t.tag === tag
        })

        console.log(task)

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
        stringTasks,
        stringThematics,
        showMemberUpdateModal,
        setShowMemberUpdateModal,
        showMemberToast,
        setShowMemberToast,
        
    }

    return (
        <DataContext.Provider value={DataContextData}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
