import {saveOptions} from "../option/OptionMutations";
import {saveQuestion} from "./QuestionMutations";

export const AddBulkQuestions = async (data, questions) => {
  for (const key in data) {
    const option1 = data[key].option1;
    const option2 = data[key].option2;

    const {option1Id, option2Id} = await saveOptions(option1, option2)
    await saveQuestion(option1Id, option2Id)
  }

  // loop through all the questions to see if the question already exists
}
