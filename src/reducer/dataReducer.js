import { 
    TASK_LOADED_FAIL, 
    TASK_LOADED_SUCCESS, 
    UPDATE_TASK,
    FIND_TASK,
    DELETE_TASK,
    ADD_TASK,
    QUESTION_LOADED_SUCCESS,
    QUESTION_LOADED_FAIL,
    FIND_QUESTION,
    UPDATE_QUESTION,
    ADD_QUESTION,
    DELETE_LESSON,
    THEMATIC_LOADED_SUCCESS,
    THEMATIC_LOADED_FAIL,
    FIND_THEMATIC,
    UPDATE_THEMATIC,
    DELETE_THEMATIC,
    ADD_THEMATIC,
    LESSON_LOADED_SUCCESS,
    LESSON_LOADED_FAIL,
    FIND_LESSON,
    UPDATE_LESSON,
    CONTEST_LOADED_SUCCESS,
    CONTEST_LOADED_FAIL,
    FIND_CONTEST,
    UPDATE_CONTEST,
    DELETE_CONTEST,
    ADD_CONTEST,
    DELETE_QUESTION,
    ADD_LESSON,
    TEXT_LOADED_SUCCESS,
    TEXT_LOADED_FAIL,
    FIND_TEXT,
    UPDATE_TEXT,
    DELETE_TEXT,
    ADD_TEXT
} from "../utils/VariableName"

export const DataReducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
        case TASK_LOADED_SUCCESS:
            return {
                ...state,
                tasks: payload,
                taskLoading: false
            }
        
        case TASK_LOADED_FAIL:
            return {
                ...state,
                tasks: [],
                taskLoading: false
            }

        case FIND_TASK:
            return {
                ...state,
                nowTask:payload
            }
            
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.tag === payload.tag ? payload : task)
            }

        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.tag !== payload)
            }

        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks,payload]
            }

        case TASK_LOADED_SUCCESS:
            return {
                ...state,
                tasks: payload,
                taskLoading: false
            }
        
        case TASK_LOADED_FAIL:
            return {
                ...state,
                tasks: [],
                taskLoading: false
            }

        case FIND_TASK:
            return {
                ...state,
                nowTask:payload
            }
            
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.tag === payload.tag ? payload : task)
            }

        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.tag !== payload)
            }

        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks,payload]
            }

        case QUESTION_LOADED_SUCCESS:
            return {
                ...state,
                questions: payload,
                questionLoading: false
            }
        
        case QUESTION_LOADED_FAIL:
            return {
                ...state,
                questions: [],
                questionLoading: false
            }

        case FIND_QUESTION:
            return {
                ...state,
                nowQuestion:payload
            }
            
        case UPDATE_QUESTION:
            return {
                ...state,
                questions: state.questions.map(q => q._id === payload._id ? payload : q)
            }

        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(q => q._id !== payload)
            }

        case ADD_QUESTION:
            return {
                ...state,
                questions: [...state.questions,payload]
            }

        case THEMATIC_LOADED_SUCCESS:
            return {
                ...state,
                thematics: payload,
                thematicLoading: false
            }
        
        case THEMATIC_LOADED_FAIL:
            return {
                ...state,
                thematics: [],
                thematicLoading: false
            }

        case FIND_THEMATIC:
            return {
                ...state,
                nowThematic:payload
            }
            
        case UPDATE_THEMATIC:
            return {
                ...state,
                thematics: state.thematics.map(q => q.tag === payload.tag ? payload : q)
            }

        case DELETE_THEMATIC:
            return {
                ...state,
                thematics: state.thematics.filter(q => q.tag !== payload)
            }

        case ADD_THEMATIC:
            return {
                ...state,
                thematics: [...state.thematics,payload]
            }

        case LESSON_LOADED_SUCCESS:
            return {
                ...state,
                lessons: payload,
                lessonLoading: false
            }
        
        case LESSON_LOADED_FAIL:
            return {
                ...state,
                lessons: [],
                lessonLoading: false
            }

        case FIND_LESSON:
            return {
                ...state,
                nowLesson:payload
            }
            
        case UPDATE_LESSON:
            return {
                ...state,
                lessons: state.lessons.map(q => q._id === payload._id ? payload : q)
            }

        case DELETE_LESSON:
            return {
                ...state,
                lessons: state.lessons.filter(q => q._id !== payload)
            }

        case ADD_LESSON:
            return {
                ...state,
                lessons: [...state.lessons,payload]
            }

        case CONTEST_LOADED_SUCCESS:
            return {
                ...state,
                contests: payload,
                contestLoading: false
            }
        
        case CONTEST_LOADED_FAIL:
            return {
                ...state,
                contests: [],
                contestLoading: false
            }

        case FIND_CONTEST:
            return {
                ...state,
                nowContest:payload
            }
            
        case UPDATE_CONTEST:
            return {
                ...state,
                contests: state.contests.map(q => q._id === payload._id ? payload : q)
            }

        case DELETE_CONTEST:
            return {
                ...state,
                contests: state.contests.filter(q => q.tag !== payload)
            }

        case ADD_CONTEST:
            return {
                ...state,
                contests: [...state.contests,payload]
            }
        
        case TEXT_LOADED_SUCCESS:
            return {
                ...state,
                texts: payload,
                textLoading: false
            }
        
        case TEXT_LOADED_FAIL:
            return {
                ...state,
                texts: [],
                textLoading: false
            }

        case FIND_TEXT:
            return {
                ...state,
                nowText:payload
            }
            
        case UPDATE_TEXT:
            return {
                ...state,
                texts: state.texts.map(q => q._id === payload._id ? payload : q)
            }

        case DELETE_TEXT:
            return {
                ...state,
                texts: state.texts.filter(q => q.tag !== payload)
            }

        case ADD_TEXT:
            return {
                ...state,
                texts: [...state.texts,payload]
            }
        
        default: 
            return state
    }
}