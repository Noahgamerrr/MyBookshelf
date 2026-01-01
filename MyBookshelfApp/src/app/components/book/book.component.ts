import { Component, input } from "@angular/core";

@Component({
    selector: 'book',
    templateUrl: 'book.component.html',
    styleUrl: 'book.component.scss'
})
export class Book {
    title = input("");
    author = input("");
    description = input("");
    rating = input(0);
    thoughts = input("");
    cover = input("");
}