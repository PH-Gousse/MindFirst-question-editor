import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Rank {
  readonly userId: string;
  readonly percentage?: number;
  readonly profile?: Profile;
  readonly answerWithSameQuestions?: (AnswerWithSameQuestions | null)[];
  constructor(init: ModelInit<Rank>);
}

export declare class AnswerWithSameQuestions {
  readonly questionId: string;
  readonly option1: string;
  readonly option2: string;
  readonly optionCurrentUser: string;
  readonly optionUser: string;
  constructor(init: ModelInit<AnswerWithSameQuestions>);
}

type ProfileMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PhotoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AnswerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type QuestionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OptionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MessageMetaData = {
  readOnlyFields: 'updatedAt';
}

export declare class Profile {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly birthday?: string;
  readonly gender?: string;
  readonly interestedIn?: string;
  readonly shortDescription?: string;
  readonly photos?: (Photo | null)[];
  readonly ageRange?: (number | null)[];
  readonly location?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Profile, ProfileMetaData>);
  static copyOf(source: Profile, mutator: (draft: MutableModel<Profile, ProfileMetaData>) => MutableModel<Profile, ProfileMetaData> | void): Profile;
}

export declare class Photo {
  readonly id: string;
  readonly profileID: string;
  readonly key: string;
  readonly position: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Photo, PhotoMetaData>);
  static copyOf(source: Photo, mutator: (draft: MutableModel<Photo, PhotoMetaData>) => MutableModel<Photo, PhotoMetaData> | void): Photo;
}

export declare class ChatRoomUser {
  readonly id: string;
  readonly user?: User;
  readonly chatRoom?: ChatRoom;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoomUser, ChatRoomUserMetaData>);
  static copyOf(source: ChatRoomUser, mutator: (draft: MutableModel<ChatRoomUser, ChatRoomUserMetaData>) => MutableModel<ChatRoomUser, ChatRoomUserMetaData> | void): ChatRoomUser;
}

export declare class User {
  readonly id: string;
  readonly phoneNumber: string;
  readonly email?: string;
  readonly isOnBoardingCompleted?: boolean;
  readonly profile?: Profile;
  readonly answers?: (Answer | null)[];
  readonly status?: string;
  readonly chatRoomUser?: (ChatRoomUser | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Answer {
  readonly id: string;
  readonly userID: string;
  readonly question: Question;
  readonly option: Option;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Answer, AnswerMetaData>);
  static copyOf(source: Answer, mutator: (draft: MutableModel<Answer, AnswerMetaData>) => MutableModel<Answer, AnswerMetaData> | void): Answer;
}

export declare class Question {
  readonly id: string;
  readonly option1: Option;
  readonly option2: Option;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Question, QuestionMetaData>);
  static copyOf(source: Question, mutator: (draft: MutableModel<Question, QuestionMetaData>) => MutableModel<Question, QuestionMetaData> | void): Question;
}

export declare class Option {
  readonly id: string;
  readonly label: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Option, OptionMetaData>);
  static copyOf(source: Option, mutator: (draft: MutableModel<Option, OptionMetaData>) => MutableModel<Option, OptionMetaData> | void): Option;
}

export declare class ChatRoom {
  readonly id: string;
  readonly chatRoomUsers?: (ChatRoomUser | null)[];
  readonly messages?: (Message | null)[];
  readonly lastMessageId: string;
  readonly lastMessage?: Message;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}

export declare class Message {
  readonly id: string;
  readonly content: string;
  readonly user?: User;
  readonly chatRoom?: ChatRoom;
  readonly createdAt: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}