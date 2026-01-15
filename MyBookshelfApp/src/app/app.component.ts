import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Book } from '../types/book';
import { Bookshelf } from "./components/bookshelf/bookshelf.component";
import { BookForm } from './components/bookForm/bookform.component';
import { Observable } from 'rxjs';
import { HttpBookService } from './services/http-book.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FormsModule, Bookshelf, BookForm],
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

    showBookForm() {
        this.showAddBookForm = true;
    }

    showBookshelf() {
        this.showAddBookForm = false;
    }

    loadBooks() {
        this.books$ = this.httpBookService.getBooks();
    }

    onUpload() {
        this.loadBooks();
        this.showBookshelf();
    }
}
