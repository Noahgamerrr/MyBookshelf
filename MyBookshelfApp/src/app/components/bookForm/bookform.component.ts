import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book, FileEventTarget } from '../../../types/book';
import { HttpBookService } from '../../services/http-book.service';
import { Rating } from './rating/rating.component';

@Component({
    selector: 'book-form',
    templateUrl: './bookform.component.html',
    styleUrl: './bookform.component.scss',
    imports: [FormsModule, Rating]
})
export class BookForm {
    private httpBookService = inject(HttpBookService);
    onUpload = output<void>();

    model = new Book(0, '', '', '',  1, null, '');

    addBook() {
        this.httpBookService.addBook({...this.model, cover: undefined}, (id) => this.uploadCover(id));
    }

    uploadCover(id: number) {
        if (this.model.cover) {
            const cover: File = this.model.cover;
            this.httpBookService.addCover(id, cover, () => this.onUpload.emit());
        } else this.onUpload.emit();
        this.model = new Book(0, '', '', '',  1, null, '');
    }

    setCover(event: Event) {
        if (!event.target) return;
        const file: File = (event.target as FileEventTarget).files[0];
        this.model.cover = file;
    }
}