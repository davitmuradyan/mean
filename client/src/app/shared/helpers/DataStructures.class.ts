import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DataStructures {
   createStack() {
    const stack = [];
    return {
      insert(item) {
        stack.push(item)
      },
      remove() {
        return stack.pop()
      },
      peek() {
        return stack[stack.length - 1]
      },
      length() {
        return stack.length
      },
      isEmpty() {
        return stack.length === 0
      },
      stack
    }
  }

  createQueue() {
    const queue = [];
    return {
      enqueue(item) {
        queue.unshift(item)
      },
      dequeue() {
        queue.pop()
      },
      peek() {
        return queue[queue.length - 1]
      },
      len() {
        return queue.length
      },
      isEmpty() {
        return queue.length === 0
      },
      queue
    }
  }

  createPriorityQueue() {
    const highPriorityQueue = this.createQueue();
    const lowPriorityQueue = this.createQueue();

    return {
      enqueue(item, isHighPriority = false) {
        const queue = isHighPriority ? highPriorityQueue : lowPriorityQueue;
        queue.enqueue(item)
      },
      dequeue() {
        if (!highPriorityQueue.isEmpty()) {
          return highPriorityQueue.dequeue()
        }

        return lowPriorityQueue.dequeue()
      },
      peek() {
        if (!highPriorityQueue.isEmpty()) {
          return highPriorityQueue.peek()
        }

        return lowPriorityQueue.peek()
      },
      len() {
        return highPriorityQueue.len() + lowPriorityQueue.len()
      },
      isEmpty() {
        return highPriorityQueue.isEmpty() && lowPriorityQueue.isEmpty()
      },
      highPriorityQueue,
      lowPriorityQueue,
    }
  }

  createNode(value) {
    return {
      value,
      next: null
    }
  }

  createLinkedList() {
    return {
      head: null,
      tail: null,
      length: 0,

      push(value) {
        const node = {
          value,
          next: null
        };
        // const node = this.createNode(value);

        if (this.head === null) {
          this.head = node;
          this.tail = node;
          this.length++;
          return node;
        }

        this.tail.next = node;
        this.tail = node;
        this.length++;

        return node;
      },

      pop() {
        if (this.isEmpty()) {
          return null;
        }

        const node = this.tail;

        if (this.head === this.tail) {
          this.head = null;
          this.tail = null;
          this.length--;
          return node;
        }

        let current = this.head;
        let penultimate;
        while (current) {
          if (current.next === this.tail) {
            penultimate = current;
            break
          }

          current = current.next;
        }

        penultimate.next = null;
        this.tail = penultimate;
        this.length--;

        return node;
      },

      get(index) {
        if (index < 0 || index > this.length) {
          return null;
        }

        if (index === 0) {
          return this.head;
        }

        let current = this.head;
        let i = 0;
        while (i < index) {
          i++;
          current = current.next;
        }

        return current;
      },

      delete(index) {
        if (index < 0 || index > this.length) {
          return null;
        }

        if (index === 0) {
          const deleted = this.head;

          this.head = this.head.next;
          this.length--;

          return deleted;
        }

        let current = this.head;
        let previous;
        let i = 0;

        while (i < index) {
          i++;
          previous = current;
          current = current.next;
        }

        const deleted = current;
        previous.next = current.next;
        this.length--;

        return deleted;
      },

      isEmpty() {
        return this.length === 0;
      },

      print() {
        const values = [];
        let current = this.head;

        while (current) {
          values.push(current.value);
          current = current.next
        }

        return values;
      }
    }
  }
}
