import {DataStore} from "aws-amplify";
import {Option} from "../../models";


export const saveOptions = async (label1, label2) => {
  const option1 = new Option({
    label: label1
  });

  const option2 = new Option({
    label: label2
  });

  const option1Model = await DataStore.save(option1);
  const option2Model = await DataStore.save(option2);

  return {option1Model, option2Model};
};
