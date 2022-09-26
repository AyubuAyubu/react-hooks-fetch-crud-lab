import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

const QuestionUrl="http://localhost:4000/questions"
function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch( QuestionUrl)
      .then((resp) => resp.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => {
        const updatedQuestions = questions.filter((quiz) => quiz.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((resp) => resp.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((quiz) => {
          if (quiz.id === updatedQuestion.id) return updatedQuestion;
          return quiz;
        });
        setQuestions(updatedQuestions);
      });
  }

  const questionItems = questions.map((quiz) => (
    <QuestionItem
      key={quiz.id}
      question={quiz}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;