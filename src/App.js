import React, {useEffect, useState} from 'react';
import Amplify from 'aws-amplify';

import './App.css';

import awsExports from "./aws-exports";
import {Box, Button, Container, TextField} from "@material-ui/core";
import {DataGrid} from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getAllQuestions} from "./actions/question/QuestionQueries";
import {saveOptions} from "./actions/option/OptionMutations";
import {saveQuestion} from "./actions/question/QuestionMutations";


Amplify.configure(awsExports);

const columns = [
  {field: 'id', headerName: 'Question id', width: 450},
  {
    field: 'option1',
    headerName: 'option1',
    width: 200,
    valueGetter: (params) => {
      // console.log(params.row.option1.label);
      return params.row.option1.label;
    }
  },
  {
    field: 'option2',
    headerName: 'option2',
    width: 200,
    valueGetter: (params) => {
      // console.log(params.row.option2.label);
      return params.row.option2.label;
    }
  },
  {field: 'createdAt', headerName: 'Created At', width: 300},
]

const App = () => {
  const [formState, setFormState] = useState({option1: '', option2: ''});
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchQuestions = async () => {
      // console.log('fetchQuestions');
      setIsLoading(true);
      try {
        const items = await getAllQuestions();
        setQuestions(items);
        return items;
      } catch (err) {
        console.error('error fetching questions', err);
      }
    };

    // console.log('useEffect');
    fetchQuestions().then(r => {
      setIsLoading(false);
      // console.log('useEffect r', r)
    });
  }, []);

  const setInput = (key, value) => {
    const capitaliseFirstLetterString = (value && value[0].toUpperCase() + value.slice(1)) || "";
    setFormState({...formState, [key]: capitaliseFirstLetterString});
  };


  const addQuestion = async () => {
    // console.log(formState);
    try {
      if (!formState.option1 || !formState.option2) return;

      const {option1Id, option2Id} = await saveOptions(formState.option1, formState.option2);

      const newQuestion = await saveQuestion(option1Id, option2Id);

      setQuestions(oldArrayQuestion => [...oldArrayQuestion, newQuestion]);
      setFormState({option1: '', option2: ''});
    } catch (err) {
      console.log('error creating question', err);
    }
  }

  return (
    <Container>
      <h2>Mind First - Question Editor</h2>
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
      <Box style={{height: 500, width: '100%'}} alignItems="center" justifyContent="center" display="flex">
        {isLoading ? <CircularProgress/> : (
          <DataGrid
            rows={questions}
            columns={columns}
            pageSize={100}
            rowHeight={20}
          />
        )}
      </Box>
    </Container>
  );
}

export default App;
