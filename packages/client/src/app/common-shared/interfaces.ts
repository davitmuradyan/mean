export interface User {
    username: string;
    email?: string;
    password: string;
    firstname?: string;
    lastname?: string;
    id?: string;
    dateRegistered?: Date;
    imgSrc: string;
    type?: string;
    blocked?: boolean;
    _id?: string;
}

export interface Stack {
  stack: any;
  insert: any;
  remove: any;
  peek: any;
  length: any;
  isEmpty: any;
}

export interface Queue {
  queue: any;
  enqueue: any;
  dequeue: any;
  peek: any;
  len: any;
  isEmpty: any;
}

export interface PriorityQueue {
  enqueue: any;
  dequeue: any;
  peek: any;
  len: any;
  isEmpty: any;
  highPriorityQueue: any;
  lowPriorityQueue: any;
}

export interface Node {
  
}

export interface LinkedList {
  head: any;
  tail: any;
  length: any;
  push: any;
  pop: any;
  get: any;
  delete: any;
  isEmpty: any;
  print: any;
}

export interface Solution {
  comments: string[];
  course: string;
  functionName: string;
  name: string;
  numberOfInputs: number;
  parameters: string[];
  solution: string;
  status: string;
  testCaseInput: any;
  testCaseOutput: string;
  userSubmitted: string;
  feedback: string;
  _id: string;
}

export interface Course {
  comments: string;
  feedback: string;
  courseName: string;
  needDB: boolean;
  problems: string[];
  status: string;
  userCreated: string;
  description: string;
  _id: string;
}

export interface Courses {
  courses: Course[];
  length: number;
}

export interface Solutions {
  solutions: Solution[];
  length: number;
}
