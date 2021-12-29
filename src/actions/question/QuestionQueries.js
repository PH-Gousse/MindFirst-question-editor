import {API, graphqlOperation} from "aws-amplify";
import {listQuestions} from "../../graphql/queries";

export const getAllQuestions = async () => {
  let items = [];
  let nextToken = null;

  do {
    const {data: {listQuestions: {items: nextItems, nextToken: nextNextToken}}} = await API.graphql(graphqlOperation(listQuestions, {nextToken}))
    items = items.concat(nextItems)
    nextToken = nextNextToken
  } while (nextToken)

  return items;
}
