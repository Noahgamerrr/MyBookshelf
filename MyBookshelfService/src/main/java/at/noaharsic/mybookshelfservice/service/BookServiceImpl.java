package at.noaharsic.mybookshelfservice.service;

import at.noaharsic.mybookshelfservice.model.Book;
import at.noaharsic.mybookshelfservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookRepository repository;

    @Override
    public List<Book> get() {
        return repository.findAll();
    }

    @Override
    public Book insert(Book book) {
        return repository.saveAndFlush(book);
    }


}
