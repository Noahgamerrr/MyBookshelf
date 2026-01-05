import { Component, ElementRef, input, viewChild } from "@angular/core";
import { BookStar } from "./bookStar/bookStar.component";
import { Constants } from "../../../types/constants";

@Component({
    selector: 'read-book',
    templateUrl: 'book.component.html',
    styleUrl: 'book.component.scss',
    imports: [ BookStar ]
})
export class ReadBook {
    id = input(0);
    title = input("");
    author = input("");
    description = input("");
    rating = input(0);
    thoughts = input("");
    cover = input("");
    apiBasePath = Constants.apiBasePath;

    bookCover = viewChild<ElementRef<HTMLImageElement>>("bookCover");

    loadFallback() {
        if (!this.bookCover()) return;
        const bookCover = this.bookCover() as ElementRef<HTMLImageElement>;
        bookCover.nativeElement.onerror = () => {};
        bookCover.nativeElement.src = "/images/books/no_cover.png";
        return true;
    }
}