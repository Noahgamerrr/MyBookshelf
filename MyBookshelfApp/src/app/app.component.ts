import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReadBook } from './components/book/book.component';
import { FormsModule } from '@angular/forms';
import { Book, FileEventTarget } from '../types/book';
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

    model = new Book(0, '', '', '',  null, 0, '');

    bookshelf = viewChild<ElementRef<HTMLDivElement>>('bookshelf');
    addBookForm = viewChild<ElementRef<HTMLDivElement>>('addBookForm');

    loadBooks() {
        this.books$ = this.httpBookService.getBooks();
        const bookshelf = this.bookshelf() as ElementRef<HTMLDivElement>;
        const addBookForm = this.addBookForm() as ElementRef<HTMLDivElement>;
        bookshelf.nativeElement.style.display = 'inherit';
        addBookForm.nativeElement.style.display = "none";
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
        this.httpBookService.addBook({...this.model, cover: undefined}, (id) => this.uploadCover(id));
    }

    uploadCover(id: number) {
        if (this.model.cover) {
            const cover: File = this.model.cover;
            this.httpBookService.addCover(id, cover, () => this.loadBooks());
        } else this.loadBooks();
        this.model = new Book(0, '', '', '',  null, 0, '');
    }

    setCover(event: Event) {
        if (!event.target) return;
        const file: File = (event.target as FileEventTarget).files[0];
        this.model.cover = file;
    }
}
