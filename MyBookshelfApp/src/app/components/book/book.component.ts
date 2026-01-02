import { Component, input } from "@angular/core";
import { BookStar } from "./bookStar/bookStar.component";

@Component({
    selector: 'book',
    templateUrl: 'book.component.html',
    styleUrl: 'book.component.scss',
    imports: [ BookStar ]
})
export class Book {
    title = input("");
    author = input("");
    description = input("");
    rating = input(0);
    thoughts = input("");
    cover = input("");
}