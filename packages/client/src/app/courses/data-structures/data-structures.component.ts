import { Component, OnInit } from '@angular/core';
import { DataStructures } from "../../shared/helpers/DataStructures.class";
import { Stack, Queue, PriorityQueue, LinkedList, Node } from "../../shared/interfaces";
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-data-structures',
  templateUrl: './data-structures.component.html',
  styleUrls: ['./data-structures.component.scss']
})
export class DataStructuresComponent implements OnInit {
  faLongArrowAltRight = faLongArrowAltRight;
  stackMessage = '';
  queueMessage = '';
  prQueueMessage = '';
  stack: Stack;
  queue: Queue;
  prQueue:PriorityQueue;
  linkedList: LinkedList;
  node: Node;
  stackInputNotEmpty = false;
  queueInputNotEmpty = false;
  prQueueInputNotEmpty = false;
  linkedListInputNotEmpty = false;
  linkedListArray = [];

  constructor(private dataStructures: DataStructures) { }

  ngOnInit() {
    this.stack = this.dataStructures.createStack();
    this.queue = this.dataStructures.createQueue();
    this.prQueue = this.dataStructures.createPriorityQueue();
    this.node = this.dataStructures.createNode(null);
    this.linkedList = this.dataStructures.createLinkedList();
  }

  checkStackInputEmpty(event) {
    this.stackInputNotEmpty = !!event.target.value;
  }

  checkQueueInputEmpty(event) {
    this.queueInputNotEmpty = !!event.target.value;
  }

  checkPrQueueInputEmpty(event) {
    this.prQueueInputNotEmpty = !!event.target.value;
  }

  checkLinkedListInputEmpty(event) {
    this.linkedListInputNotEmpty = !!event.target.value;
  }

  addNode(value) {
    this.linkedList.push(value);
    this.linkedListArray = this.linkedList.print();
  }

  concatQueues() {
    return [...this.prQueue.lowPriorityQueue.queue, ...this.prQueue.highPriorityQueue.queue];
  }

}
