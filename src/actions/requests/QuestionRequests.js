import {API, graphqlOperation} from "aws-amplify";
import {listQuestions} from "../../graphql/queries";

const getQuestions = async (nToken = null) => {
  const {data: {listQuestions: { items, nextToken }}} = await API.graphql(graphqlOperation(listQuestions, {nextToken: nToken}));
  return {items, nextToken};
}

export const getAllQuestions = async () => {
  let nToken = null;
  let arrayItems = [];
  let {items, nextToken} = await getQuestions(nToken);

  arrayItems = [...arrayItems, ...items];

  while (nextToken !== null) {
    nToken = nextToken;

    const data = await getQuestions(nToken);
    nextToken = data.nextToken;
    items = data.items;

    arrayItems = [...arrayItems, ...items];
  }

  return arrayItems;
}
