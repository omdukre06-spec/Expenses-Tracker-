package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.entity.User;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        User user = getAuthenticatedUser();
        return ResponseEntity.ok(categoryRepository.findByUserId(user.getId()));
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        User user = getAuthenticatedUser();
        category.setUser(user);
        return ResponseEntity.ok(categoryRepository.save(category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        User user = getAuthenticatedUser();
        Category category = categoryRepository.findById(id).orElseThrow();
        
        if (!category.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Unauthorized");
        }
        
        categoryRepository.delete(category);
        return ResponseEntity.ok().build();
    }
}
