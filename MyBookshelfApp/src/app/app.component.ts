import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReadBook } from './components/book/book.component';
import { FormsModule } from '@angular/forms';
import { Book, FileEventTarget } from '../types/book';
import { HttpBookService } from './services/http-book.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Rating } from './components/rating/rating.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ReadBook, FormsModule, AsyncPipe, Rating],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'My bookshelf';
    books$!: Observable<Book[]>;
    showAddBookForm = false;

    private httpBookService = inject(HttpBookService);

    constructor() {
        effect(() => {
            this.loadBooks();
        })
    }

    model = new Book(0, '', '', '',  1, null, '');

    loadBooks() {
        this.books$ = this.httpBookService.getBooks();
        this.showAddBookForm = false;
    }

    showBookForm() {
        this.showAddBookForm = true;
    }

    addBook() {
        this.httpBookService.addBook({...this.model, cover: undefined}, (id) => this.uploadCover(id));
    }

    uploadCover(id: number) {
        if (this.model.cover) {
            const cover: File = this.model.cover;
            this.httpBookService.addCover(id, cover, () => this.loadBooks());
        } else this.loadBooks();
        this.model = new Book(0, '', '', '',  1, null, '');
    }

    setCover(event: Event) {
        if (!event.target) return;
        const file: File = (event.target as FileEventTarget).files[0];
        this.model.cover = file;
    }
}
