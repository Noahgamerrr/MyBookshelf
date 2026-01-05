package at.noaharsic.mybookshelfservice.controller;

import at.noaharsic.mybookshelfservice.model.Book;
import at.noaharsic.mybookshelfservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BookController {
    @Autowired
    private BookService bookService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping("/api/books")
    public List<Book> getAllBooks() {
        return bookService.get();
    }

    @PostMapping("/api/books")
    public ResponseEntity<Book> create(@RequestBody Book book) {
        System.out.println(book);
        Book b = bookService.insert(book);
        if (b != null) return ResponseEntity.ok(b);
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/api/books/{id}")
    public ResponseEntity<String> uploadImage(@PathVariable int id, @RequestPart("file") MultipartFile file) {
        try {
            saveImage(file, id +".jpg");
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .header("Location", "/api/books/" +id +"/cover")
                    .body("Image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }

    @GetMapping("/api/books/{id}/cover")
    public ResponseEntity<?> getCover(@PathVariable int id) throws Exception {
        Path path = Paths.get(uploadDir);
        if (!Files.exists(path)) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error loading image");
        Path filePath = path.resolve(id +".jpg");
        if (!Files.exists(filePath)) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Image does not exist");
        Resource resource = new UrlResource(filePath.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    private void saveImage(MultipartFile file, String fileName) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    }


}
