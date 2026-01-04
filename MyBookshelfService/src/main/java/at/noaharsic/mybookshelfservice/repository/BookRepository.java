package at.noaharsic.mybookshelfservice.repository;

import at.noaharsic.mybookshelfservice.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
