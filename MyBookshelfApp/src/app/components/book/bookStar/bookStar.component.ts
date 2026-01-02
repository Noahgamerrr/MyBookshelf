import { Component, input } from "@angular/core";

@Component({
    selector: 'book-star',
    templateUrl: 'bookStar.component.html',
    styleUrl: 'bookStar.component.scss'
})
export class BookStar {
    fill = input("")
}