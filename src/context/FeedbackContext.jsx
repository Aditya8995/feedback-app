import { createContext, useState } from "react";
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item is from useContext',
            rating: 10
        }
    ])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item : {},
        edit : false
    })
    const deleteFeedback = (id) =>{
        if(window.confirm('Are you want to delete?')){
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }    
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback,...feedback]);
    }
    const updateFeedback = (id,upItem) =>{
        setFeedback(
            feedback.map((item) => 
                (item.id === id ? {...item, ...upItem } : item) 
            )
        )
    }

    const editFeedback = (item) =>  {
        setFeedbackEdit({
            item,
            edit : true
        })
    }

    return <FeedbackContext.Provider value = {{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback, 
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;