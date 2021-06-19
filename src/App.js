import React, {useCallback, useEffect, useState} from 'react';
import Amplify, {API, graphqlOperation} from 'aws-amplify';

import './App.css';

import awsExports from "./aws-exports";
import {listQuestions} from "./graphql/queries";
import {createOption, createQuestion} from "./graphql/mutations";
import {Box, Button, Container, TextField} from "@material-ui/core";
import {DataGrid} from '@material-ui/data-grid';

Amplify.configure(awsExports);

const columns = [
  {field: 'id', headerName: 'Question id', width: 500},
  {
    field: 'option1',
    headerName: 'option1',
    width: 150,
    valueGetter: (params) => {
      // console.log(params.row.option1.label);
      return params.row.option1.label;
    }
  },
  {
    field: 'option2',
    headerName: 'option2',
    width: 150,
    valueGetter: (params) => {
      // console.log(params.row.option2.label);
      return params.row.option2.label;
    }
  },
  {field: 'createdAt', headerName: 'Created At', width: 200},
]

const App = () => {
  const [formState, setFormState] = useState({option1: '', option2: ''});
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = useCallback(async () => {
    console.log('fetchQuestions');
    try {
      const questionsData = await API.graphql(graphqlOperation(listQuestions));
      setQuestions(questionsData.data.listQuestions.items);
    } catch (err) {
      console.log('error fetching questions')
    }
  }, []);

  useEffect(() => {
    console.log('useEffect')
    fetchQuestions().then(r => console.log('useEffect r', r));
  }, [fetchQuestions]);

  const setInput = (key, value) => {
    setFormState({...formState, [key]: value});
  };


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
      setFormState({option1: '', option2: ''});
    } catch (err) {
      console.log('error creating question', err);
    }
  }

  return (
    <Container>
      <h2>Question Editor</h2>
      <Box my={5} display="flex" alignItems="center" justifyContent="center">
        <TextField
          onChange={event => setInput('option1', event.target.value)}
          value={formState.option1}
          label="Option 1"
          required
          variant="outlined"
        />
        <TextField
          onChange={event => setInput('option2', event.target.value)}
          value={formState.option2}
          label="Option 2"
          required
          variant="outlined"
          style={{marginLeft: 8, marginRight: 8}}
        />
        <Button onClick={addQuestion} variant="contained" color="primary" size="large">Add a new Question</Button>
      </Box>
      <Box style={{height: 400, width: '100%'}}>
        <DataGrid
          rows={questions}
          columns={columns}
          pageSize={100}
          rowHeight={25}
        />
      </Box>
    </Container>
  );
}

export default App;
