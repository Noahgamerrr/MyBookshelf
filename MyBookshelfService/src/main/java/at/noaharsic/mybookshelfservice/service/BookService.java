package at.noaharsic.mybookshelfservice.service;

import at.noaharsic.mybookshelfservice.model.Book;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface BookService {
    List<Book> get();
    Book insert(Book book);
}
