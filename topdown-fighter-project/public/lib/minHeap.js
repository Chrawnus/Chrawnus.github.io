class Node {
    constructor(val, score) {
        this.value = val;
        this.score = score;
    }
}

export class MinHeap {
    constructor() {
        this.heap = [null]
    }

    getMin() {
        return this.heap[1]
    }

    insert(node, cost) {
        let newNode = new Node(node, cost);
        this.heap.push(newNode);
        this.bubbleUp();
    }

    extractMin() {
        let smallest = this.heap[1];

        if (this.heap.length <= 2) {
            this.heap.splice(this.heap.length - 1);
            this.heap[0] = null;
            return smallest;
        }

        if (this.heap.length > 2) {

        }

    }

    bubbleUp() {
        let currIdx = this.heap.length - 1;
        let parIdx = Math.floor(currIdx / 2);
        while (currIdx > 1 && this.heap[parIdx].score > this.heap[currIdx].score) {
            [this.heap[parIdx], this.heap[currIdx] = this.heap[currIdx], this.heap[parIdx]];
            currIdx = Math.floor(currIdx / 2);
        }
    }

    swap()
}