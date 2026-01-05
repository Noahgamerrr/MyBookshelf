export class Book {
    constructor(
        public id: number,
        public title: string,
        public author: string,
        public description: string,
        public cover?: File | null,
        public rating?: number,
        public thoughts?: string,
    ) {}
}

export interface FileEventTarget extends EventTarget {
    files: File[]
}