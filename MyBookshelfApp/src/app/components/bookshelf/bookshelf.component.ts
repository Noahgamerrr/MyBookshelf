import { Component, effect, ElementRef, inject, input, output, viewChild } from "@angular/core";
import { ReadBook } from "../book/book.component";
import { Observable } from "rxjs";
import { Book } from "../../../types/book";
import { HttpBookService } from "../../services/http-book.service";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'bookshelf',
    templateUrl: 'bookshelf.component.html',
    styleUrl: 'bookshelf.component.scss',
    imports: [ ReadBook, AsyncPipe ]
})
export class Bookshelf {
    showBookForm = output<void>();
    books$ = input.required<Observable<Book[]>>();
}