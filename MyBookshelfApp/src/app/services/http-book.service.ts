import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../types/book';
import { Constants } from '../../types/constants';

@Injectable({
  providedIn: 'root'
})
export class HttpBookService {
    private http = inject(HttpClient);

    constructor() { }

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(Constants.apiBasePath + "/api/books");
    }

    addBook(book: Book, onSuccess?: (id: number) => void): void {
        this.http.post<Book>(Constants.apiBasePath + "/api/books", book).subscribe({
            next: (book) => {
                console.log("New book created: ", book);
                if (onSuccess) onSuccess(book.id);
            },
            error: (_) => console.log("Error uploading book")
        });
    }

    addCover(id: number, cover: File, onSuccess?: () => void): void {
        const formdata = new FormData();
        formdata.append('file', cover);
        this.http.put<String>(Constants.apiBasePath +`/api/books/${id}`, formdata, {
            responseType: 'text' as 'json'
        }).subscribe({
            next: (_) => { if (onSuccess) onSuccess(); console.log("Hello World!") },
            error: (str) => console.log(str)
        })
    }
}
