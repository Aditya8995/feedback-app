import { useContext, useEffect, useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  const [text , setText] = useState('');
  const [rating , setRating] = useState(10);
  const [btnDisabled , setBtnDisabled] = useState(true);
  const [message , setMessage] = useState(null);

  useEffect(() =>{
    if(feedbackEdit.edit === true){
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])
  
  const handleTextChange = ({ target: { value } }) =>{
        if (value === '') {
          setBtnDisabled(true)
          setMessage(null)
        } 
        else if (value.trim().length < 10) {
          setMessage('Text must be at least 10 characters')
          setBtnDisabled(true)
        } 
        else {
          setMessage(null)
          setBtnDisabled(false)
        }
        setText(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newFeedback = {
      rating,
      text,
    }
    if(feedbackEdit.edit === true){
      updateFeedback(feedbackEdit.item.id, newFeedback)
      feedbackEdit.edit = false
    }
    else{
      addFeedback(newFeedback);
    }
    setText('');
  }
  function select (rating){
    setRating(rating)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your servive with us?</h2>
        <RatingSelect select = {select} />
        <div className="input-group">
            <input onChange={handleTextChange} type='text' value={text} placeholder='Write a review' />
            <Button type='submit' version='secondary' isDisabled = {btnDisabled} >Send</Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
