export class Book {
    constructor(
        public id: number,
        public title: string,
        public author: string,
        public description: string,
        public rating: number,
        public cover?: File | null,
        public thoughts?: string,
    ) {}
}

export interface FileEventTarget extends EventTarget {
    files: File[]
}