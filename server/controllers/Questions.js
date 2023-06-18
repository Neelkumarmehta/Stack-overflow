import Questions from '../models/Question.js'
import mongoose from 'mongoose'
export const AskQuestion = async (req, res) => {
    const postQuestionData = req.body;
    const postQuestion = new Questions(postQuestionData);
    //console.log(postQuestion);
    try {
      await postQuestion.save();
      res.status(200).json("Posted a question successfully");
    } catch (error) {
      console.log(error);
      res.status(409).json("Couldn't post a new question");
    }
  };
  export const getAllQuestions = async (req, res) => {
    try{
      const questionList = await Questions.find();
      res.status(200).json(questionList);
    }catch(err){
      res.status(404).json({message: err.message});
    }
  }
  export const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("question unavailable...");
    }
  
    try {
      await Questions.findByIdAndRemove(_id);
      res.status(200).json({ message: "successfully deleted..." });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  export const voteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const { value,userId } = req.body;
    
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("question unavailable...");
    }
  
    try {
      const question = await Questions.findById(_id);
      const upIndex = question.upvotes.findIndex((id) => id === String(userId));
      const downIndex = question.downvotes.findIndex(
        (id) => id === String(userId)
      );
  
      if (value === "upvotes") {
        if (downIndex !== -1) {
          question.downvotes = question.downvotes.filter(
            (id) => id !== String(userId)
          );
        }
        if (upIndex === -1) {
          question.upvotes.push(userId);
        } else {
          question.upvotes = question.upvotes.filter((id) => id !== String(userId));
        }
      } else if (value === "downvotes") {
        if (upIndex !== -1) {
          question.upvotes = question.upvotes.filter((id) => id !== String(userId));
        }
        if (downIndex === -1) {
          question.downvotes.push(userId);
        } else {
          question.downvotes = question.downvotes.filter(
            (id) => id !== String(userId)
          );
        }
      }
      await Questions.findByIdAndUpdate(_id, question);
      res.status(200).json({ message: "voted successfully..." });
    } catch (error) {
      res.status(404).json({ message: "id not found" });
    }
  };