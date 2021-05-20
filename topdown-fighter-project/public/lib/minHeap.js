class Node {
    constructor(value, score) {
        this.value = value;
        this.score = score;
    }
}

export class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    push(value, score) {
        const newNode = new Node(value, score)
        this.heap.push(newNode);
        const nodeIndex = this.heap.length - 1;
        this.bubbleUp(nodeIndex);

    }

    pop() {
    	const node = this.heap[0];
        const lastNode = this.heap.pop();
        
        if (this.heap.length) {
        	this.heap[0] = lastNode;
            this.moveDown(0);
        }
        
        return node;
    }

    getParentIndex(nodeIndex) {
        //Root node does not have parent
        if (nodeIndex === 0) return null;

        return Math.floor((nodeIndex - 1) / 2);
    }

    getChildrenIndices(nodeIndex) {
        const leftIndex = nodeIndex * 2 + 1;
        const rightIndex = leftIndex + 1;

        // Children will be [null, null] if called on leaf nodes
        return [leftIndex, rightIndex].map(index => index < this.size ? index : null);
    }

    bubbleUp(nodeIndex) {
        const parentIndex = this.getParentIndex(nodeIndex);

        if (parentIndex === null) {
            return;
        }

        const currentNode = this.heap[nodeIndex];
        const parentNode = this.heap[parentIndex];

        if (currentNode.score < parentNode.score) {
            this.swap(nodeIndex, parentIndex);
            this.bubbleUp(parentIndex);
        }
    }

    moveDown(nodeIndex) {
        const [leftIndex, rightIndex] = this.getChildrenIndices(nodeIndex);

        if (leftIndex === null) {
            return;
        }

        let swapIndex = null;
        const parentNode = this.heap[nodeIndex];
        const leftChild = this.heap[leftIndex];

        if (leftChild.score < parentNode.score) {
            swapIndex = leftIndex;
        }

        if (rightIndex !== null) {
            const rightChild = this.heap[rightIndex];
            if (swapIndex !== null) {
                if (rightChild.score < leftChild.score) {
                    swapIndex = rightIndex;
                }
            }
        }

        if (swapIndex === null) {
            return;
        }

        this.swap(nodeIndex, swapIndex);
        this.moveDown(swapIndex);
    }

    swap(index1, index2) {
        return [[this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]];
    }
}