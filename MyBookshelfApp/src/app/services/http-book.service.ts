import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../types/book';

@Injectable({
  providedIn: 'root'
})
export class HttpBookService {
    private http = inject(HttpClient);
    private BASE_URL = "http://localhost:8080";

    constructor() { }

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.BASE_URL + "/api/books");
    }

    addBook(book: Book, onSuccess?: () => void): void {
        this.http.post<Book>(this.BASE_URL + "/api/books", book).subscribe((book) => {
            console.log("New book created: ", book);
            if (onSuccess) onSuccess();
        });
    }
}
