package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.entity.Transaction;
import com.example.demo.entity.User;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

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
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        User user = getAuthenticatedUser();
        return ResponseEntity.ok(transactionRepository.findByUserIdOrderByTransactionDateDesc(user.getId()));
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transactionRequest) {
        User user = getAuthenticatedUser();
        
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setAmount(transactionRequest.getAmount());
        transaction.setType(transactionRequest.getType());
        transaction.setDescription(transactionRequest.getDescription());
        transaction.setPaymentMethod(transactionRequest.getPaymentMethod());
        transaction.setTransactionDate(transactionRequest.getTransactionDate());
        transaction.setNotes(transactionRequest.getNotes());
        
        if (transactionRequest.getCategory() != null && transactionRequest.getCategory().getId() != null) {
            Category category = categoryRepository.findById(transactionRequest.getCategory().getId()).orElse(null);
            transaction.setCategory(category);
        }

        return ResponseEntity.ok(transactionRepository.save(transaction));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        User user = getAuthenticatedUser();
        Transaction transaction = transactionRepository.findById(id).orElseThrow();
        
        if (!transaction.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Unauthorized");
        }
        
        transactionRepository.delete(transaction);
        return ResponseEntity.ok().build();
    }
}
