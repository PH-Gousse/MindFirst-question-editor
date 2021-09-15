import {DataStore} from "aws-amplify";
import {Question} from "../../models";

export const getAllQuestions = async () => {
  const questions = await DataStore.query(Question);
  // console.log('questions', questions);

  return questions;
}
