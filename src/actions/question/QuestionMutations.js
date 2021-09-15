import {Question} from "../../models";
import {DataStore} from "aws-amplify";

export const saveQuestion = async (option1Model, option2Model) => {
  const question = new Question({
    option1: option1Model,
    option2: option2Model
  });

  const questionModel = await DataStore.save(question);

  return questionModel;
};
