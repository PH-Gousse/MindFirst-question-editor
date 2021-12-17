import {API, graphqlOperation} from "aws-amplify";
import {listQuestions} from "../../graphql/queries";

export const getAllQuestions = async () => {
  const questions = await API.graphql(graphqlOperation(listQuestions));
  // console.log('questions', questions);

  return questions.data.listQuestions.items;
}
