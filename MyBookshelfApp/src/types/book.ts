export class Book {
    constructor(
        public id: number,
        public title: string,
        public author: string,
        public description: string,
        public cover: string,
        public rating?: number,
        public thoughts?: string,
    ) {}
}