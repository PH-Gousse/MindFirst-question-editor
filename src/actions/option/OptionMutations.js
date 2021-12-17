import {API, graphqlOperation} from "aws-amplify";
import {createOption} from "../../graphql/mutations";


export const saveOptions = async (label1, label2) => {
  const option1 = {
    label: label1
  };

  const option2 = {
    label: label2
  };

  const resultOption1 = await API.graphql(graphqlOperation(createOption, {input: option1}));
  const option1Id = resultOption1.data.createOption.id;

  const resultOption2 = await API.graphql(graphqlOperation(createOption, {input: option2}));
  const option2Id = resultOption2.data.createOption.id;

  return {option1Id, option2Id};
};
