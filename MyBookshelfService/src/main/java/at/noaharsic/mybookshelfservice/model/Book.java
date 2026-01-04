package at.noaharsic.mybookshelfservice.model;

import at.noaharsic.mybookshelfservice.validator.ValueBetween;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @Column
    @NotBlank(message = "Author must be provided")
    private String title;

    @Column
    @NotBlank(message = "Author must be provided")
    private String author;

    @Column
    private String description;

    @Column
    private String cover;

    @Column
    @ValueBetween
    private int rating;

    @Column
    private String thoughts;

    public Book() {
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getThoughts() {
        return thoughts;
    }

    public void setThoughts(String thoughts) {
        this.thoughts = thoughts;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return Id == book.Id && rating == book.rating && Objects.equals(thoughts, book.thoughts) && Objects.equals(title, book.title) && Objects.equals(author, book.author) && Objects.equals(description, book.description) && Objects.equals(cover, book.cover);
    }

    @Override
    public int hashCode() {
        return Objects.hash(Id, title, author, description, cover, rating, thoughts);
    }

    @Override
    public String toString() {
        return "Book{" +
                "Id=" + Id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", description='" + description + '\'' +
                ", cover='" + cover + '\'' +
                ", rating=" + rating +
                ", thoughts=" + thoughts +
                '}';
    }
}
