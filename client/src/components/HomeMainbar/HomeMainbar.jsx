import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import './HomeMainbar.css'
import QuestionList from './QuestionList'

const HomeMainbar = () => {

  // var  questionsList=[{
  //   _id: '1',
  //   upvotes: 3,
  //   downvotes: 2,
  //   noOfAnswer: 3,
  //   questionTitle: "What is a function?",
  //   questionBody: "It meant to be",
  //   quesitonTags: ["java", "node js", "react js", "moongoose"],
  //   userPosted: "Neel",
  //   userId: 1,
  //   askedOn: "jan 3",
  //   answer: [{
  //     answerBody: "Answer",
  //     userAnswered: "Mehta",
  //     userId: 2,
  //     answeredOn:'jan 1',
      
  //   }]
  // },{
  //   _id: '2',
  //   upvotes: 3,
  //   downvotes: 2,
  //   noOfAnswer: 2,
  //   questionTitle: "What is a function?",
  //   questionBody: "It meant to be",
  //   quesitonTags: ["java", "node js", "react js", "moongoose"],
  //   userPosted: "Neel",
  //   userId: 1,
  //   askedOn: "jan 1",
  //   answer: [{
  //     answerBody: "Answer",
  //     userAnswered: "kumar",
  //     userId: 2,
  //     answeredOn:'jan 1',
  //   }]
  // },{
  //   _id: '3',
  //   upvotes: 3,
  //   downvotes: 2,
  //   noOfAnswer: 1,
  //   questionTitle: "What is a function?",
  //   questionBody: "It meant to be",
  //   quesitonTags: ["java", "node js", "react js", "moongoose"],
  //   userPosted: "Neel",
  //   userId: 1,
  //   askedOn: "jan 1",
  //   answer: [{
  //     answerBody: "Answer",
  //     userAnswered: "kumar",
  //     userId: 2,
  //     answeredOn:'jan 1',
     
  //   }]
  // }];

  const location=useLocation();
  const user=1;
  const navigate = useNavigate();

  const questionsList = useSelector((state) => state.questionReducer);
  console.log(questionsList);
  const checkAuth = () =>{
        if(user===null){
        alert("login or signup to ask a question")
        navigate('/Auth');
        }
        else{
          navigate('/AskQuestion');
        }
    }
  return (
    <div className="main-bar">
      <div className="main-bar-header">
      {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {
          questionsList.data== null?
          <h1>Loading...</h1>:
          <>
          <p>{questionsList.data.length} Questions</p>
            <QuestionList questionsList={questionsList.data} />

          </>
        }
      </div>
      
    </div>
  )
}

export default HomeMainbar
