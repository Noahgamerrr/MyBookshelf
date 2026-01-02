import { Component, ElementRef, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReadBook } from './components/book/book.component';
import { FormsModule } from '@angular/forms';
import BookData from '../../public/data/books.json';
import { Book } from '../types/book';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ReadBook, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'My bookshelf';
    books = BookData as Book[];

    model = new Book(0, '', '', '',  '', 0, '');

    bookshelf = viewChild<ElementRef<HTMLDivElement>>('bookshelf');
    addBookForm = viewChild<ElementRef<HTMLDivElement>>('addBookForm');

    showBookForm() {
        if (!this.bookshelf() || !this.addBookForm()) return;
        const bookshelf = this.bookshelf() as ElementRef<HTMLDivElement>;
        const addBookForm = this.addBookForm() as ElementRef<HTMLDivElement>;
        bookshelf.nativeElement.style.display = 'none';
        addBookForm.nativeElement.style.display = "inherit";
    }

    addBook() {
        if (!this.bookshelf() || !this.addBookForm()) return;
        this.model.id = this.books.length + 1;
        this.books.push(this.model);
        this.model = new Book(0, '', '', '',  '', 0, '');
        const bookshelf = this.bookshelf() as ElementRef<HTMLDivElement>;
        const addBookForm = this.addBookForm() as ElementRef<HTMLDivElement>;
        bookshelf.nativeElement.style.display = 'inherit';
        addBookForm.nativeElement.style.display = "none";
    }
}
