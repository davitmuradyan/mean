export interface User {
    username: String;
    email?: String;
    password: String;
    firstname?: String;
    lastname?: String;
    id?: String;
    dateRegistered?: Date;
    imgSrc: String;
}

export interface Stack {
  insert: any;
  remove: any;
  peek: any;
  length: any;
  isEmpty: any;
}

export interface Queue {
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
