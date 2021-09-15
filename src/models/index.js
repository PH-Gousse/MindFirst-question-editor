// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Profile, Photo, ChatRoomUser, User, Answer, Question, Option, ChatRoom, Message, Rank, AnswerWithSameQuestions } = initSchema(schema);

export {
  Profile,
  Photo,
  ChatRoomUser,
  User,
  Answer,
  Question,
  Option,
  ChatRoom,
  Message,
  Rank,
  AnswerWithSameQuestions
};