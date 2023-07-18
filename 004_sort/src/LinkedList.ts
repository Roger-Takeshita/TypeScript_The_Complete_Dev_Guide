import { Sorter } from './Sorter';

class Node {
    next: Node | null = null;

    constructor(public data: number) {}
}

export class LinkedList extends Sorter {
    head: Node | null = null;
    private len: number;

    constructor() {
        super();
        this.len = 0;
    }

    add(data: number): void {
        const node = new Node(data);

        if (!this.head) {
            this.head = node;
            return;
        }

        let tail = this.head;
        if (!this.len) this.len = 1;

        while (tail.next) {
            tail = tail.next;
        }

        tail.next = node;
        this.len += 1;
    }

    // Getter
    get length(): number {
        return this.len;
    }

    at(idx: number): Node {
        if (!this.head) throw new Error('Idx out of bounds');

        let count = 0;
        let node: Node | null = this.head;

        while (node) {
            if (count === idx) return node;
            count += 1;
            node = node.next;
        }

        throw new Error('Idx out of bounds');
    }

    compare(leftIdx: number, rightIdx: number): boolean {
        if (!this.head) throw new Error('List is empty');
        return this.at(leftIdx).data > this.at(rightIdx).data;
    }

    swap(leftIdx: number, rightIdx: number): void {
        const leftNode = this.at(leftIdx);
        const rightNode = this.at(rightIdx);

        const leftHand = leftNode.data;
        leftNode.data = rightNode.data;
        rightNode.data = leftHand;
    }

    print(): void {
        if (!this.head) return;

        let node: Node | null = this.head;

        while (node) {
            console.log(node.data);
            node = node.next;
        }
    }
}
