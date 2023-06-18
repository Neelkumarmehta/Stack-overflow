import React from 'react'
import { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useParams,Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import copy from 'copy-to-clipboard'


import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import Avatar from '../../components/Avatar/Avatar'
import './Questions.css'
import DisplayAnswer from './DisplayAnswer'
import { postAnswer,deleteQuestion,voteQuestion } from '../../actions/question'

const QuestionDetails = () => {
 const {id}=useParams()
 const questionsList = useSelector((state) => state.questionReducer);
 const [Answer,setAnswer]=useState('');
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const User = useSelector((state) => state.currentUserreducer);
 const location = useLocation();
 const url = "http://localhost:3000";
 console.log(location);
 const handlePostAns = (e,answerLength) => {
      e.preventDefault();
      if(User===null){
        alert("Login or Signup to answer a question");
        navigate('/Auth');
      }
      else {
        if (Answer === "") {
          alert("Enter an answer before submitting");
        } else {
          dispatch(
            postAnswer({
              id,
              noOfAnswers: answerLength + 1,
              answerBody: Answer,
              userAnswered: User.result.name,
              userId: User.result._id
            })
          );
          setAnswer("");
        }
      }
 }
 const handleShare = () => {
    copy(url + location.pathname);
    alert('Copied url: '+ url + location.pathname);
 }
 const handleDelete = () => {
  dispatch(deleteQuestion(id,navigate));
 }
 const handleUpvote = () => {
  dispatch(voteQuestion(id,'upvotes',User.result._id));
 }
 const handleDownvote = () => {
  dispatch(voteQuestion(id,'downvotes',User.result._id));
 }
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
  return (
    <div className='question-details-page'>
     {
        questionsList.data===null?
        <h1>Loading...</h1>:
        <>
        {
            questionsList.data.filter(question => question._id === id).map(question => (
                <div key={question._id}>
                 <section className='question-details-container'>
                     <h1>{question.questionTitle}</h1>
                     <div className='question-details-container-2'>
                        <div className='question-votes'>
                        <img src={upvote} alt='upvote' width='18' className='votes-icon' onClick={handleUpvote}/>
                        <p>{question.upvotes.length - question.downvotes.length}</p>
                        <img src={downvote} alt='downvote'width='18' className='votes-icon' onClick={handleDownvote}/>

                        </div>
                        <div style={{width: '100%'}}>
                        <p className='question-body'>{question.questionBody}</p>
                        <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                        <p key={tag}>{tag}</p>
                        ))}
                      </div>
                        <div className='question-actions-user'>
                            <div>
                              <button type='button' onClick={handleShare}>Share</button>
                              {User?.result?._id === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                              
                            </div>
                            <div>
                                <p>asked {moment(question.askedOn).fromNow()}</p>
                                <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                 <Avatar backgroundColor="orange" px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                 <div>
                                    {question.userPosted}
                                 </div>
                                </Link>
                            </div>
                        </div>
                        </div>

                     </div>

                 </section>
                 {
                    question.noOfAnswer!==0 && (
                        <section>
                            <h3>{question.noOfAnswer} Answers</h3>
                            <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                        </section>
                    )
                 }
                 <section className='post-ans-container'>
                    <h3>Your Answer</h3>
                    <form onSubmit={(e) => {handlePostAns(e, question.answer.length);}}>
                        <textarea name="" id="" cols="30" rows="10" onChange={e => setAnswer(e.target.value)}></textarea><br/>
                        <input type="submit" className='post-ans-btn' value='Post Your Answer'/>
                    </form>
                    <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link to="/AskQuestion" style={{ textDecoration: "none", color: "#009dff" }}>
                      {" "}
                      ask your own question.
                    </Link>
                  </p>
                 </section>

                </div>
            ))
        }
        </>
     }
    </div>
  )
}

export default QuestionDetails
