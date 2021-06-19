import React, { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';

import './App.css';

import awsExports from "./aws-exports";
import {listQuestions} from "./graphql/queries";
import {createOption, createQuestion} from "./graphql/mutations";
Amplify.configure(awsExports);

const App = () => {
  const [formState, setFormState] = useState({option1: '', option2: ''});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    console.log('useEffect')
    return () => {
      fetchQuestions().then(r => console.log('useEffect r', r));
    };
  }, []);

  const setInput = (key, value) => {
    setFormState({...formState, [key]: value});
  };

  async function fetchQuestions() {
    console.log('fetchQuestions');
    try {
      const questionsData = await API.graphql(graphqlOperation(listQuestions));
      console.log(questionsData);
      setQuestions(questionsData.data.listQuestions.items);
    } catch (err) { console.log('error fetching questions') }
  }

  const addQuestion = async () => {
    console.log(formState);
    try {
      if (!formState.option1 || !formState.option2) return;

      const option1 = {
        label: formState.option1
      };
      const option2 = {
        label: formState.option2
      };

      const resultOption1 = await API.graphql(graphqlOperation(createOption, {input: option1}));
      const option1Id = resultOption1.data.createOption.id;

      const resultOption2 = await API.graphql(graphqlOperation(createOption, {input: option2}));
      const option2Id = resultOption2.data.createOption.id;

      const question = {
        questionOption1Id: option1Id,
        questionOption2Id: option2Id
      }

      const resultQuestion = await API.graphql(graphqlOperation(createQuestion, {input: question}));
      const newQuestion = resultQuestion.data.createQuestion;

      setQuestions(oldArrayQuestion => [...oldArrayQuestion, newQuestion]);

    } catch (err) {
      console.log('error creating question', err);
    }
  }

  return (
    <div className="App">
      <h2>Question Editor</h2>
      <div>
        <input
          onChange={event => setInput('option1', event.target.value)}
          value={formState.option1}
          placeholder="Option 1"
        />
        <input
          onChange={event => setInput('option2', event.target.value)}
          value={formState.option2}
          placeholder="Option 2"
        />
        <button onClick={addQuestion}>Add a new Question</button>
      </div>
      <div>
        {
          questions.map((question, index) => (
            <div key={question.id ? question.id : index}>
              <p>{question.id}</p>
              <p>{question.option1.label}</p>
              <p>{question.option2.label}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
