import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReadBook } from './components/book/book.component';
import { FormsModule } from '@angular/forms';
import { Book } from '../types/book';
import { HttpBookService } from './services/http-book.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ReadBook, FormsModule, AsyncPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'My bookshelf';
    books$!: Observable<Book[]>;

    private httpBookService = inject(HttpBookService);

    constructor() {
        effect(() => {
            this.loadBooks();
        })
    }

    model = new Book(0, '', '', '',  '', 0, '');

    bookshelf = viewChild<ElementRef<HTMLDivElement>>('bookshelf');
    addBookForm = viewChild<ElementRef<HTMLDivElement>>('addBookForm');

    loadBooks() {
        this.books$ = this.httpBookService.getBooks();
    }

    showBookForm() {
        if (!this.bookshelf() || !this.addBookForm()) return;
        const bookshelf = this.bookshelf() as ElementRef<HTMLDivElement>;
        const addBookForm = this.addBookForm() as ElementRef<HTMLDivElement>;
        bookshelf.nativeElement.style.display = 'none';
        addBookForm.nativeElement.style.display = "inherit";
    }

    addBook() {
        
        if (!this.bookshelf() || !this.addBookForm()) return;
        this.httpBookService.addBook(this.model, () => this.loadBooks());
        this.books$ = this.httpBookService.getBooks();
        this.model = new Book(0, '', '', '',  '', 0, '');
        const bookshelf = this.bookshelf() as ElementRef<HTMLDivElement>;
        const addBookForm = this.addBookForm() as ElementRef<HTMLDivElement>;
        bookshelf.nativeElement.style.display = 'inherit';
        addBookForm.nativeElement.style.display = "none";
    }
}
