import {API, graphqlOperation} from "aws-amplify";
import {createQuestion} from "../../graphql/mutations";

export const saveQuestion = async (option1Id, option2Id) => {
  const question = {
    questionOption1Id: option1Id,
    questionOption2Id: option2Id
  }

  const resultQuestion = await API.graphql(graphqlOperation(createQuestion, {input: question}));

  return resultQuestion.data.createQuestion;
};
