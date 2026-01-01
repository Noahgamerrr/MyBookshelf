import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from './components/book/book.component';
import BookData from '../../public/data/books.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Book],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'My bookshelf';
  books = BookData
}
